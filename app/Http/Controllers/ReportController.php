<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockTransaction;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        //Filters
        $startDate = $request->input('startDate', now()->subWeek()); // default last 7 days
        $endDate = $request->input('endDate', now());
        $supplierId = $request->input('supplier_id'); // optional supplier filter

        // Base query with optional supplier filter
        $baseQuery = StockTransaction::join('products', 'stock_transactions.product_id', '=', 'products.id');

        if ($supplierId) {
            $baseQuery->where('products.supplier_id', $supplierId);
        }

        //Total outbound value (sales)
        $totalSales = (clone $baseQuery)
            ->where('stock_transactions.type', 'out')
            ->whereBetween('stock_transactions.created_at', [$startDate, $endDate])
            ->sum(DB::raw('stock_transactions.quantity * products.price'));

        //Total inbound value (purchases)
        $totalInbound = (clone $baseQuery)
            ->where('stock_transactions.type', 'in')
            ->whereBetween('stock_transactions.created_at', [$startDate, $endDate])
            ->sum(DB::raw('stock_transactions.quantity * products.cost'));

        //Profit margin = (Sales - Cost) / Sales
        $profitMargin = $totalSales > 0
            ? round((($totalSales - $totalInbound) / $totalSales) * 100, 2)
            : 0;

        //Low stock count
        $lowStock = Product::when($supplierId, fn($q) => $q->where('supplier_id', $supplierId))
            ->whereColumn('quantity', '<=', 'threshold')
            ->count();

        //Chart Data
        $chartData = StockTransaction::selectRaw("
    DATE(created_at) as date,
    SUM(CASE WHEN type = 'in' THEN quantity ELSE 0 END) as inbound,
    SUM(CASE WHEN type = 'out' THEN quantity ELSE 0 END) as outbound
")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get();


        // Product performance table
        $products = Product::when($supplierId, fn($q) => $q->where('supplier_id', $supplierId))
            ->select('id', 'name', 'sku', 'quantity', 'cost', 'price', 'threshold')
            ->get()
            ->map(function ($p) {
                $unitsSold = StockTransaction::where('product_id', $p->id)
                    ->where('type', 'out')
                    ->sum('quantity');

                return [
                    'name' => $p->name,
                    'sku' => $p->sku,
                    'units_sold' => $unitsSold,
                    'revenue' => number_format($unitsSold * $p->price, 2),
                    'stock_level' => $p->quantity <= $p->threshold ? 'Low Stock' : 'In Stock',
                ];
            });

        //All suppliers for dropdown filter
        $suppliers = Supplier::select('id', 'name')->get();

        return Inertia::render('Reports/Index', [
            'metrics' => [
                'totalSales' => (float) ($totalSales ?? 0),
                'totalInbound' => (float) ($totalInbound ?? 0),
                'profitMargin' => (float) ($profitMargin ?? 0),
                'lowStock' => (int) ($lowStock ?? 0),
            ],
            'chartData' => $chartData,
            'products' => $products,
            'suppliers' => \App\Models\Supplier::select('id', 'name')->get(),
            'filters' => [
                'startDate' => $startDate instanceof \Carbon\Carbon ? $startDate->toDateString() : (string)$startDate,
                'endDate' => $endDate instanceof \Carbon\Carbon ? $endDate->toDateString() : (string)$endDate,
                'supplierId' => $request->input('supplierId', null),
            ],
        ]);
    }
}

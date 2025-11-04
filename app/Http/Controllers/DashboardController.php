<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\User;
use App\Models\StockTransaction;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalInventoryValue = Product::sum(DB::raw('cost * quantity'));
        $totalRetailValue = Product::sum(DB::raw('price * quantity'));
        $totalProducts = Product::count();
        $lowStockCount = Product::whereColumn('quantity', '<=', 'threshold')->count();

        $lowStock = Product::whereColumn('quantity', '<=', 'threshold')
            ->select('id', 'name', 'quantity', 'threshold')
            ->get();

        $salesData = StockTransaction::where('type', 'out')
            ->select('product_id', DB::raw('SUM(ABS(quantity)) as total_sold'))
            ->groupBy('product_id')
            ->pluck('total_sold', 'product_id');

        $topProducts = Product::select('id', 'name', 'sku', 'quantity')
            ->get()
            ->map(function ($p) use ($salesData) {
                return [
                    'id' => $p->id,
                    'name' => $p->name,
                    'sku' => $p->sku,
                    'units_sold' => $salesData[$p->id] ?? 0,
                    'stock_level' => $p->quantity <= $p->threshold ? 'Low Stock' : $p->quantity,
                ];
            })
            ->sortByDesc('units_sold')
            ->take(4)
            ->values();

        $users = User::select('id', 'name', 'email', 'role')->get();

        return Inertia::render('Dashboard/Index', [
            'metrics' => [
                'totalValue' => round($totalInventoryValue, 2),
                'totalRetailValue' => round($totalRetailValue, 2),
                'totalProducts' => $totalProducts,
                'lowStock' => $lowStockCount,
                'activeUsers' => $users->count(),
            ],
            'lowStock' => $lowStock,
            'topProducts' => $topProducts,
            'users' => $users,
        ]);
    }
}

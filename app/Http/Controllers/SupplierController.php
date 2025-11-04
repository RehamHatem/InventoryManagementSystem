<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function __construct()
    {
    }

    // List all suppliers
    public function index()
    {
        $suppliers = Supplier::orderBy('name')->get();
        return Inertia::render('Suppliers/Index', compact('suppliers'));
    }

    // Show form to create supplier
    public function create()
    {
        return Inertia::render('Suppliers/Create');
    }

    // Store new supplier
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'name' => 'required|string|min:2|max:50',
                'email' => 'required|email|max:255|unique:suppliers,email',
                'phone' => 'required|string|size:11|regex:/^[0-9+\-\s()]*$/',
                'address' => 'required|string|max:255',
            ],
            [
                'name.required' => 'The supplier name is required.',
                'email.required' => 'The email address is required.',
                'email.email' => 'Please provide a valid email address.',
                'email.unique' => 'This email is already used by another supplier.',
                'phone.required' => 'The phone number is required.',
                'phone.regex' => 'The phone number format is invalid.',
                'address.required' => 'The address field is required.',
            ]
        );

        Supplier::create($data);

        return redirect()->route('suppliers.index')->with('success', 'Supplier created successfully.');
    }

    // Show edit form
    public function edit(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Edit', compact('supplier'));
    }

    // Update supplier
    public function update(Request $request, Supplier $supplier)
    {
        $data = $request->validate(
            [
                'name' => 'required|string|min:2|max:50',
                'email' => 'required|email|max:255|unique:suppliers,email,' . $supplier->id,
                'phone' => 'required|string|max:20|regex:/^[0-9+\-\s()]*$/',
                'address' => 'required|string|max:255',
            ],
            [
                'name.required' => 'The supplier name is required.',
                'email.required' => 'The email address is required.',
                'email.email' => 'Please provide a valid email address.',
                'email.unique' => 'This email is already used by another supplier.',
                'phone.required' => 'The phone number is required.',
                'phone.regex' => 'The phone number format is invalid.',
                'address.required' => 'The address field is required.',
            ]
        );

        $supplier->update($data);

        return redirect()->route('suppliers.index')->with('success', 'Supplier updated successfully.');
    }

    // Delete supplier
    public function destroy(Supplier $supplier)
    {
        $supplier->delete();

        return redirect()->route('suppliers.index')->with('success', 'Supplier deleted successfully.');
    }
}

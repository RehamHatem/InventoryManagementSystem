<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|string|in:user,manager,admin',
        ]);

        $user->update(['role' => $validated['role']]);

        return redirect()->back()->with('success', "User role updated successfully!");
    }
    public function destroy(User $user)
{
    $user->delete();

    return redirect()->back()->with('success', 'User deleted successfully.');
}

}

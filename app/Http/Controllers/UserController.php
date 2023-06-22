<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller {
    public function index() {
        $users = User::with('roles')->get()->all();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function create() {
        $roles = Role::all();
        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'roles' => 'required',
            'phone_number' => 'required|string|min:11',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password)
        ]);

        foreach($request->roles as $role) {
            $user->assignRole($role);
        }

        return redirect()->route('user.index');
    }

    public function show($id) {
        $user = User::with('roles')->find($id);
        $roles = Role::all();
        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function edit($id) {
        $user = User::with('roles')->find($id);
        $roles = Role::all();
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|max:255',
            'password' => 'nullable|string|min:8',
            'roles' => 'required',
            'phone_number' => 'string|min:11',
        ]);
        $user = User::find($id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number, 
        ]);
        if (isset($request->password)) {
            $user->update([
                'password' => Hash::make($request->password)
            ]);
        }
        $user->syncRoles($request->roles ?? $user->roles);
        $user->save();
        return redirect()->route('user.index');
        
    }

    public function destroy($id) {
        User::find($id)->delete();
        return redirect()->route('user.index');
    }

    public function showProfile() {
        $user = Auth::user();
        return Inertia::render('Profile/Index', [
            'user' => $user
        ]);
    }
}

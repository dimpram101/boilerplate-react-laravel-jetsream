<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get()->all();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        $roles = Role::all();
        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
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

        foreach ($request->roles as $role) {
            $user->assignRole($role);
        }

        return redirect()->route('user.index');
    }

    public function show($id)
    {
        $user = User::with('roles')->find($id);
        $roles = Role::all();
        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function edit($id)
    {
        $user = User::with('roles')->find($id);
        $roles = Role::all();
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, $id)
    {
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

    public function guestUpdate(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|min:4',
            'email' => 'required|string|email|max:255',
            'password' => 'nullable|string|min:8',
            'currentPassword' => 'nullable|min:8',
            'confirmPassword' => 'nullable|same:password|min:8',
            'phone_number' => 'required|string|min:11',
        ]);
        $user = User::find($id);
        
        $isPasswordValid = $request->currentPassword ? Hash::check($request->currentPassword, $user->password) : true;
        if(!$isPasswordValid) {
            return redirect()->route('profile.index')->withErrors([
                'currentPassword' => 'The current password is incorrect!'
            ]);
        }

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
        $user->save();
        return redirect()->route('profile.index');
    }

    public function updateProfilePhoto(Request $request, $id) {
        $request->validate([
            'profile_photo' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $user = User::find($id);
        
        $image = $request->file('profile_photo');
        $imagePath = 'profile_photo/'.md5($image->getClientOriginalName() . random_bytes(4)) . '.' . $image->getClientOriginalExtension();
        Storage::disk('public')->put($imagePath, $image->getContent());

        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        $user->profile_photo_path = $imagePath;
        $user->save();

        return response()->json([
            'status' => "SUCCESS",
            'profile_photo_path' => $imagePath
        ], 200);        
    }

    public function destroy($id)
    {
        User::find($id)->delete();
        return redirect()->route('user.index');
    }

    public function showProfile()
    {
        $user = Auth::user();
        return Inertia::render('Profile/Index', [
            'user' => $user
        ]);
    }
}

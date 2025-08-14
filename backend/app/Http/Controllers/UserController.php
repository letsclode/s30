<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    // POST /api/users
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'roles' => 'required|array|min:1',
            'roles.*' => 'in:Author,Editor,Subscriber,Administrator',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt('password'), // Default password, update as needed
            ]);

            $roleIds = Role::whereIn('name', $request->roles)->pluck('id');
            $user->roles()->attach($roleIds);

            DB::commit();
            return response()->json($user->load('roles'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create user'], 500);
        }
    }

    // GET /api/users?role=Author
    public function index(Request $request)
    {
        $role = $request->query('role');
        if ($role) {
            $users = User::whereHas('roles', function ($q) use ($role) {
                $q->where('name', $role);
            })->with('roles')->get();
        } else {
            $users = User::with('roles')->get();
        }
        return response()->json($users);
    }
}

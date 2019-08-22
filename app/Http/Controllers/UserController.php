<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests;
use App\User;
use App\Http\Resources\User as UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get Articles
        $users = User::orderBy("created_at", "desc")->paginate(5);

        // Return collection of users as resource
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->isMethod('put') ? User::findOrFail($request->user_id) : new User;

        $password = $request->input('password');
        if (Hash::check('plain-text', $password)) {
            $password = Hash::make($request->input('password'));
        }

        $user->id = $request->input('user_id');
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = $password;
        $user->gender = $request->input('gender');
        $user->address = $request->input('address');
        $user->description = $request->input('description');

        if ($user->save()) {
           return new UserResource($user);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
         // Get user
        $user = User::findOrFail($id);

        // Return single user as a resource
        return new UserResource($user);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Get user
        $user = User::findOrFail($id);

        if ($user->delete()) {
            return new UserResource($user);
        }
    }
}

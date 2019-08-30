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
	public function index(Request $request)
	{
		$displayPerPage = $request->query('displayPerPage') ? $request->query('displayPerPage') : 5;
		$searchKey = $request->query('searchKey') ? $request->query('searchKey') : null;
		$sortKey = $request->query('sortKey') ? $request->query('sortKey') : 'id';
		$sortDir = $request->query('sortDir') ? $request->query('sortDir') : 'desc';

		$users = User::search($searchKey)->orderBy($sortKey, $sortDir)->paginate($displayPerPage);

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

		$user = $request->input('id') ? User::findOrFail($request->input('id')) : new User;

		$imgPath = $user->image;
		$files = $request->file('image');
		if ($files) {
		   $imgName = time()."_".$request->file('image')->getClientOriginalName();
		   $files->move('images/profile',$imgName);
		   $imgPath = 'images/profile/'.$imgName;
		}

		if ($request->input('password')) {
			$password = Hash::make($request->input('password'));
		} else {
			$password = $user->password;
		}

		$user->id = $request->input('id');
		$user->name = $request->input('name');
		$user->email = $request->input('email');
		$user->password = $password;
		$user->gender = $request->input('gender');
		$user->address = $request->input('address');
		$user->description = $request->input('description');
		$user->image = $imgPath;

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

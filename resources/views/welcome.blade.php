@extends('layouts.container')

@section('content')
	@if (Route::has('login'))
		<div class="container">
			@guest
				<div id="userList" loggedId=""></div>
			@else
				@if (Auth::user()->user_type == 'admin')
					<!-- <users :userdata="{{  json_encode(['id' => Auth::user()->id]) }}"></users> -->
					<div id="userList" loggedId="{{Auth::user()->id}}"></div>
				@else 
					<!-- <profile :userdata="{{  json_encode(['id' => Auth::user()->id]) }}"></profile> -->
					<div id="profile" loggedId="{{Auth::user()->id}}"></div>
				@endif
			@endguest
		</div>
	@endif
@endsection
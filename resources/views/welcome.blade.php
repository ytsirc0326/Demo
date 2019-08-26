@extends('layouts.container')

@section('content')
	@if (Route::has('login'))
		<div class="container">
			@guest
				<users :userdata="{id : ''}"></users>
			@else
				@if (Auth::user()->user_type == 'admin')
					<users :userdata="{{  json_encode(['id' => Auth::user()->id]) }}"></users>
				@else 
					<profile :userdata="{{  json_encode(['id' => Auth::user()->id]) }}"></profile>
				@endif
			@endguest
		</div>
	@endif
@endsection
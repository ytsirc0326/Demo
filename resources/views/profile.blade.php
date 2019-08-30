@extends('layouts.container')

@section('content')
	<div class="container">
		<!-- <profile :userdata="{{  json_encode(['id' => Auth::user()->id]) }}"></profile> -->
		<div id="profile" loggedId="{{Auth::user()->id}}"></div>
	</div>
@endsection
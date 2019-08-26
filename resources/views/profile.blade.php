@extends('layouts.container')

@section('content')
	<div class="container">
		<profile :userdata="{{  json_encode(['id' => Auth::user()->id]) }}"></profile>
	</div>
@endsection
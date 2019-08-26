<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<meta name="csrf-token" content="{{ csrf_token() }}">
		<script>window.Laravel = { csrfToken: '{{ csrf_token() }}' } </script>

		<title>Demo</title>

		<!-- Fonts -->
		<link rel="dns-prefetch" href="//fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

		<!-- Styles -->
		<link href="{{ asset('css/app.css') }}" rel="stylesheet">

		<link type="text/css" rel="stylesheet" href="{{ mix('css/app.css') }}">


		<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.5/cropper.css" integrity="sha256-x8iLuq/BLgVhgqscHiKrBZFP60kV2Xuilmpqy7kD/vI=" crossorigin="anonymous" /> -->


	</head>
	<body>

		<div id="app">
			@if (Route::has('login'))

			<nav class="navbar navbar-expand-md navbar-dark bg-primary shadow-sm mb-2">
			<!-- <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm mb-2"> -->
				<div class="container">
					<a class="navbar-brand" href="{{ url('/') }}">
						Demo
					</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
						<span class="navbar-toggler-icon"></span>
					</button>

					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<!-- Left Side Of Navbar -->
						<ul class="navbar-nav mr-auto">
						</ul>

						<!-- Right Side Of Navbar -->
						<ul class="navbar-nav ml-auto">
							<!-- Authentication Links -->
							@guest
								<li class="nav-item">
									<a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
								</li>
									@if (Route::has('register'))
									<li class="nav-item">
										<a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
									</li>
									@endif
							@else
								<li class="nav-item dropdown">
									<a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
										{{ Auth::user()->name }} <span class="caret"></span>
									</a>

									<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
										@if (Auth::user()->user_type == 'admin')
											<a class="dropdown-item" href="/demo/public/profile">Edit profile</a>
										@endif
										<a class="dropdown-item" href="{{ route('logout') }}"
										onclick="event.preventDefault();
										     document.getElementById('logout-form').submit();">
										{{ __('Logout') }}
										</a>

										<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
										@csrf
										</form>
									</div>
								</li>
							@endguest
						</ul>
					</div>
				</div>
			</nav>

			@endif

			@yield('content')

		</div>

		<!-- Scripts -->
		<script src="https://use.fontawesome.com/dcf492ee15.js"></script>
		<script src="{{ asset('js/app.js') }}"></script>

		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.5/cropper.js" integrity="sha256-U/8sUxL62BDCJvl8Dmu1uuTtKilSrHytsP3XfgCJZwo=" crossorigin="anonymous"></script> -->

	</body>
</html>

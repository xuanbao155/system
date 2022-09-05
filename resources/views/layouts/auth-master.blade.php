<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>観客アンケートシステム</title>

    <!-- Layout Auth CSS -->
    <link href="{!! url('assets/bootstrap/css/bootstrap.min.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/common/css/styles.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/backend/css/login.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/bootstrap/css/bootstrap-select.min.css') !!}" rel="stylesheet">
    <!-- font awesome -->
    <link href="{!! url('assets/fontawesome/css/all.min.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/fontawesome/css/fontawesome.min.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/fontawesome/js/fontawesome.min.js') !!}" rel="stylesheet">

</head>
<body class="text-center">
    
    <main class="form-signin">

        @yield('content')
        
    </main>

    <!-- Layout Auth js -->
    <script src="{!! url('assets/common/js/jquery-3.3.1.slim.min.js') !!}"></script>
    <script src="{!! url('assets/common/js/popper.min.js') !!}"></script>
    <script src="{!! url('assets/bootstrap/js/bootstrap.min.js') !!}"></script>
    <script src="{!! url('assets/bootstrap/js/bootstrap-select.min.js') !!}"></script>
    <script src="assets/common/js/jquery-3.6.0.js"></script>
    
    <!-- JS files for form -->
    @yield('javascript')
    <!-- /JS files for form -->
</body>
</html>
<!doctype html>
<html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>

    <!-- Layout App CSS -->
    <link href="{!! url('assets/fontawesome/css/all.min.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/fontawesome/css/fontawesome.min.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/backend/css/backend.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/css/common.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/bootstrap/css/bootstrap.min.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/common/css/jquery-ui.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/common/css/styles.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/backend/css/dashboard.css') !!}" rel="stylesheet">
    
    <!-- font awesome -->
    <link href="{!! url('assets/fontawesome/css/all.min.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/fontawesome/css/fontawesome.min.css') !!}" rel="stylesheet">
    <link href="{!! url('assets/fontawesome/js/fontawesome.min.js') !!}" rel="stylesheet">
    
    <!-- Custom styles for this template -->
    <link href="{!! url('assets/common/css/app.css') !!}" rel="stylesheet">

    <!-- Javascript -->
    <script type="text/javascript" src="{!! url('assets/common/js/jquery.min.js') !!}"></script>
    <script type="text/javascript" src="{!! url('assets/common/js/sort-table.js') !!}"></script>
    
    <style type="text/css">
        table { border: 1px solid black; border-collapse: collapse; }

        th, td { padding: 2px 5px; border: 1px solid black; }

        thead { background: #ddd; }

        table#demo2.js-sort-0 tbody tr td:nth-child(1),
        table#demo2.js-sort-1 tbody tr td:nth-child(2),
        table#demo2.js-sort-2 tbody tr td:nth-child(3),
        table#demo2.js-sort-3 tbody tr td:nth-child(4),
        table#demo2.js-sort-4 tbody tr td:nth-child(5),
        table#demo2.js-sort-5 tbody tr td:nth-child(6),
        table#demo2.js-sort-6 tbody tr td:nth-child(7),
        table#demo2.js-sort-7 tbody tr td:nth-child(8),
        table#demo2.js-sort-8 tbody tr td:nth-child(9),
        table#demo2.js-sort-9 tbody tr td:nth-child(10) {
            background: #dee;
        }
    </style>
    
    <!-- form stylesheets -->
    @yield('stylesheet')
    <!-- /form stylesheets -->
</head>
<body class="navbar-top">
    <!-- <div id=page-master> -->
        @include('layouts.partials.sidebar')

        <div class="c-wrapper c-fixed-components">
            @include('layouts.partials.header')
            <div class="c-body">
                <main class="c-main">
                    <div class="container-fluid">
                        <div class="fade-in">
                            @yield('content')
                        </div><!--fade-in-->
                    </div><!--container-fluid-->
                </main>
            </div><!--c-body-->
            @include('layouts.partials.footer')
        </div><!--c-wrapper-->
    <!-- </div> -->

    <!-- Layout App JS -->
    <script src="{!! url('assets/bootstrap/js/bootstrap.bundle.min.js') !!}"></script>
    
    <script src="{!! url('assets/common/js/jquery-3.3.1.slim.min.js') !!}"></script>
    <script src="{!! url('assets/common/js/popper.min.js') !!}"></script>
    <script src="{!! url('assets/bootstrap/js/bootstrap.min.js') !!}"></script>
    <script src="{!! url('assets/bootstrap/js/bootstrap-select.min.js') !!}"></script>

    <script src="{!! url('assets/common/js/jquery-3.6.0.js') !!}"></script>
    <script src="{!! url('assets/common/js/jquery-ui.js') !!}"></script>
    <script src="{!! url('assets/common/js/common.js') !!}"></script>
    
    <!--<script src="assets/backend/js/dashboard.js"></script>-->
    <!-- JS files for form -->
    @yield('javascript')
    <!-- /JS files for form -->
    <div id="c-sidebar"></div>
  </body>
</html>
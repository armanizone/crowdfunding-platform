<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="{{ asset('css/app.css') }}" /> -->
    <link rel="stylesheet" href="{{ mix('css/index.css') }}" />
    <script src="{{ mix('js/app.js')}}" defer></script>
    <title>Mysite.kz</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
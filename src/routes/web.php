<?php

use Illuminate\Support\Facades\Route;

Route::get('/{query}', function () {
    return view('app');
})->where('query', "^((?!api).)*$");

<?php

namespace App\Providers;


use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(255);
        JsonResource::withoutWrapping();

        ResetPassword::createUrlUsing(function($notifiable, $token) {
            return  "http://localhost:8080/resetPassword/{$token}/{$notifiable->getEmailForPasswordReset()}";
        });
    }
}

<?php

namespace App\Http\Middleware;
use Closure;
class RoleMiddleware
{
    /**
     * Handle an incoming request.
     * @param $request
     * @param Closure $next
     * @param $role
     * @param null $permission
     * @return mixed
     */
    public function handle($request, Closure $next, ...$role)
    {
        if(!auth()->user()->hasRole(...$role)) {
            abort(403 , 'Role not set');
        }
        // if($permission !== null && !auth()->user()->can($permission)) {
        //     abort(404);
        // }
        return $next($request);
    }
}

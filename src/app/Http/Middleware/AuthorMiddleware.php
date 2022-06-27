<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\ProjectPost;
use App\Models\Projects;
use Illuminate\Support\Facades\Auth;


class AuthorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->raw_project)
        {
            $project = Projects::query()
            ->where( 'id' , $request->raw_project )
            ->where( 'user_id', $request->user()->id )
            ->first();

            if($project == null)
            {
                abort(404 , 'Project with this raw project Author not found');
            }
            
            return $next($request);
        }

        $project    =   ProjectPost::query()
        ->where( 'id' , $request->project_id )
        ->where( 'user_id', $request->user()->id )
        ->first();
        
        if($project == null)
        {
            abort(404 , 'Project with this post project Author not found');
        }
        
        return $next($request);
    }
}

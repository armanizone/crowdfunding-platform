<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AuthorResourse;
use App\Models\ProjectPost;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;

class AuthorController extends Controller
{
    public function get($id)
    {
        $project = ProjectPost::query()
            ->where('id', $id)
            ->where('deleted_at', null)
            ->first();

        if($project == null){
            return response()->json("Project not found", 404);
        }

        return (new AuthorResourse( $project ))
            ->response()
            ->setStatusCode(200);
    }
}

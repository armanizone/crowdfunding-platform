<?php

namespace App\Http\Controllers\Api;

use \App\Http\Resources\ProjectResource;
use App\Models\Category;
use App\Models\ProjectHistory;
use App\Models\ProjectPost;
use App\Models\Projects;
use App\Models\ProjectUpdate;
use \App\Models\ProjectPayment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostedController extends Controller
{

    public function PostProject(Request $request, $id){
        $project = ProjectPost::query()
            ->where('id', $id)
            ->where( 'user_id' , $request->user()->id )
            ->where('deleted_at', null)
            ->where('closed_at', null)
            ->first();

        if($project == null){
            return response()->json("Project not found", 200);
        }

        $project->update([
           'closed_at' => Carbon::now()->addDays($project->days)
        ]);

        return response()->json( new ProjectResource($project) , 200);
    }


    public function ResumeEnded(Request $request)
    {
        $project    =   ProjectPost::query()
            ->where('id', $request->project_id)
            ->where('confirmed', 2)
            ->where('deleted_at', null)
            ->first();

        if($project == null){
            return response()->json("Project posted not found", 404);
        }

        $project->update([
            'closed_at' => Carbon::now()->addDays($request->days),
            'confirmed' => '0'
        ]);

        return response()->json("Project posted successfully resumed", 201);
    }


    public function getPosted(Request $request)
    {
        $projects = ProjectPost::query()
            ->where('confirmed', 0)
            ->where('deleted_at', null)
            ->where('closed_at', '>', Carbon::now())
            ->get();

        return response()->json( ProjectResource::collection( $projects ) , 200 );
    }


    public function getNotPosted(Request $request)
    {
        $projects = ProjectPost::query()
            ->where('deleted_at', null)
            ->where('closed_at', null)
            ->get();

        return response()->json(ProjectResource::collection( $projects ) , 200 );
    }


    public function getByCategory($category)
    {
        $categoryId = Category::query()->where('slug', $category)->pluck('id')->first();
        $projects = ProjectPost::all()->where('category_id', $categoryId);
        return response()->json( ProjectResource::collection( $projects ) , 200 );
    }


    public function getByIdPosted($request)
    {
        $project    =   ProjectPost::query()
            ->where('deleted_at', null)
            ->where('confirmed', 0)
            ->where('id', $request)
            ->first();

        if($project == null){
            return response()->json("Project not found", 404);
        }

        return (new ProjectResource( $project ))
            ->response()
            ->setStatusCode(200);
    }


    public function getPostedByUserId(Request $request)
    {
        $project   =   ProjectPost::query()
            ->where( 'user_id' , $request->user()->id )
            ->where( 'deleted_at', null)
            ->get();

        if($project == null){
            return response()->json("Projects posts not found", 404);
        }

        return response()->json( ProjectResource::collection ($project), 201);
    }


    public function getByIdHistory(Request $request)
    {
        $project = ProjectHistory::query()
            ->where('project_id', $request->project_id)
            ->orderBy('created_at')
            ->get();
            
        if($project == null){
            return response()->json("History not found", 404);
        }

        return response()->json($project, 200);
    }


    public function endByIdPosted(Request $request)
    {
        $project    =   ProjectPost::query()
            ->where('id', $request->project_id)
            ->where('deleted_at', null)
            ->first();

        if($project == null){
            return response()->json("Project posted not found", 404);
        }

        $project->update([
            'confirmed' => '2'
        ]);

        return response()->json("Project posted successfully ended", 201);
    }


    public function deleteByIdPosted(Request $request)
    {
        $project    =   ProjectPost::query()
            ->where('id', $request->project_id)
            ->where('confirmed', '2')
            ->first();

        if($project == null){
            return response()->json("Project posted not found", 404);
        }

        $project->update([
            'deleted_at' => Carbon::now(),
        ]);

        return response()->json("Project posted successfully deleted", 201);
    }


    public function getAllClosed(){
        $projects = ProjectPost::query()
            ->where('closed_at', '<', Carbon::now())
            ->where('deleted_at', null)
            ->get();

        return response()->json( ProjectResource::collection( $projects ) , 200 );
    }


    public function getClosedById($request)
    {
        $project    =   ProjectPost::query()
            ->where('deleted_at', '=', null)
            ->where('closed_at', '<', Carbon::now())
            ->where('id', $request)
            ->first();

        if($project == null){
            return response()->json("Project not found", 404);
        }

        return (new ProjectResource( $project ))
            ->response()
            ->setStatusCode(200);
    }


    public function getAllDeletedOrClosed(){
        $projects = ProjectPost::query()
            ->orwhere('deleted_at', '!=', null)
            ->orwhere('confirmed', 2)
            ->orWhere('closed_at', '<', Carbon::now())
            ->get();

        return response()->json( ProjectResource::collection( $projects ) , 200 );
    }


    public function getDeletedOrClosedById($request)
    {
        $project    =   ProjectPost::query()
            ->where('deleted_at', '!=', null)
            ->orWhere('closed_at', '<', Carbon::now())
            ->where('id', $request)
            ->first();

        if($project == null){
            return response()->json("Project not found", 404);
        }

        return (new ProjectResource( $project ))
            ->response()
            ->setStatusCode(200);
    }


    public function setRecomended($id)
    {
        $project = ProjectPost::query()
            ->where('id', $id)
            ->where('deleted_at', null)
            ->first();
        if($project == null)
        {
            return response()->json( $project , 404);
        }
        $project->recomended = 1;
        $project->save();

        return response()->json( "Project successfully recomended!", 200);
    }
    

    public function noRecomended($id)
    {
        $project = ProjectPost::query()
            ->where('id', $id)
            ->where('deleted_at', null)
            ->first();
        if($project == null)
        {
            return response()->json( $project , 404);
        }
        $project->recomended = 0;
        $project->save();

        return response()->json( "Project not recomended!", 200);
    }
}

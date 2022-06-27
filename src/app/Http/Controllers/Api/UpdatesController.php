<?php

namespace App\Http\Controllers\Api;

use \App\Http\Resources\ProjectResource;
use App\Models\Category;
use App\Models\ProjectHistory;
use App\Models\ProjectPost;
use App\Models\Projects;
use App\Models\ProjectUpdate;
use App\Models\User;
use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class UpdatesController extends Controller
{

    public function updatePosted(Request $request)
    {
        $project    =   ProjectPost::query()
        ->where( 'id' , $request->project_id )
        ->where('user_id', $request->user()->id)
        ->where('deleted_at', null)
        ->where('closed_at', '>', Carbon::now())
        ->first();
        if($project == null){
            return response()->json("Project not found", 404);
        }

        $projectUpdate = ProjectUpdate::query()
            ->where('project_id', $request->project_id)->first();

        if($projectUpdate == null){
            $projectUpdate = new ProjectUpdate();
        }

        $projectUpdate->user_id               =   $request->user()->id;

        if( $request->file('image'))
        {
            if( File::exists(public_path( $projectUpdate->image )) )
            {
                File::delete(public_path( $projectUpdate->image ));
            }
            $projectUpdate->image = $this->uploadFile($request->file('image'), $project->id.'/uploads', '1-Main-');
        }

        $projectUpdate->title                 =   $request->title               ?? null;
        $projectUpdate->short_description     =   $request->short_description   ?? null;
        $projectUpdate->video_or_animation    =   $request->video_or_animation  ?? null;
        $projectUpdate->detail_description    =   $request->detail_description  ?? null;
        $projectUpdate->collected_money       =   $request->collected_money     ?? null;
        $projectUpdate->confirmed             =   $request->confirmed           ?? null;
        $projectUpdate->days_left             =   $request->days_left           ?? null;

        $projectUpdate->save();

        $projectUpdate->project()->associate($project)->save();

        return response()->json( $project , 200 );
    }


    public function confirmUpdate(Request $request, $id)
    {
        $project = ProjectPost::query()
            ->with('projectUpdates')
            ->where('id', $id)
            ->first();

        $projectHistory = new ProjectHistory();
        $projectHistory->project_id             =   $project->id;
        $projectHistory->user_id                =   $project->user_id;
        $projectHistory->title                  =   $project->title;
        $projectHistory->image                  =   $project->image;
        $projectHistory->video_or_animation     =   $project->video_or_animation;
        $projectHistory->short_description      =   $project->short_description;
        $projectHistory->detail_description     =   $project->detail_description;
        $projectHistory->collected_money        =   $project->projectUpdates->collected_money;
        $projectHistory->confirmed              =   $project->projectUpdates->confirmed;
        $projectHistory->days_left              =   $project->projectUpdates->days_left;

        $projectHistory->save();
        
        $project->title                         =   $project->projectUpdates->title               ?? $project->title;
        $project->short_description             =   $project->projectUpdates->short_description   ?? $project->short_description;
        $project->video_or_animation            =   $project->projectUpdates->video_or_animation  ?? $project->video_or_animation;
        $project->detail_description            =   $project->projectUpdates->detail_description  ?? $project->detail_description;
        if ($project->projectUpdates->image != null)
        {
            if( File::exists(public_path( $project->projectUpdates->image)) )
            {
                $baseName = basename($project->projectUpdates->image);
                File::move(public_path($project->projectUpdates->image), storage_path('app/public/projects/'.$project->id.'/details'.'/'.$baseName));
                File::delete(public_path( $project->projectUpdates->image ));
                $image = "/storage/projects/$project->id/details/$baseName";
            }
            
            $project->image     =   $image  ?? $project->image;
        }
        $project->update();

        $projectUpdate = ProjectUpdate::query()
            ->where('id', $project->projectUpdates->id)
            ->delete();

        $noti = new Notification();
        $noti->user_id      = $project->user_id;
        $noti->title        = "Проект " .$project->title. " обновился!";
        $noti->definition   = "Ваш проект успешно прошел модерацию и содержит последние изменения, можете увидеть историю проекта на странице проекта!";
        $noti->save();

        return response()->json($project, 200);
    }


    public function getAllUpdates(Request $request)
    {
        $projects = ProjectUpdate::query()->get();

        if($projects == null){
            return response()->json("Projects not found", 404);
        }

        return response()->json( ( $projects ) , 200 );
    }


    public function getByIdUpdates(Request $request)
    {
        $project    =   ProjectUpdate::query()
            ->with('project')
            ->where('project_id', $request->project_id)
            ->first();

        if($project == null){
            return response()->json("Project not found", 404);
        }

        return response()->json($project, 200);
    }


    public function deleteByIdUpdates(Request $request, $id)
    {
        $project    =   ProjectUpdate::query()
            ->where('id', $id)
            ->first();

        if($project == null){
            return response()->json("Project not found", 404);
        }

        $project->delete();

        return response()->json("Project successfully deleted", 200);
    }

}
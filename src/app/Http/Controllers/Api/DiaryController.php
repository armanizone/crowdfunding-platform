<?php

namespace App\Http\Controllers\Api;

use \App\Http\Controllers\Controller;
use App\Models\Diary;
use App\Models\ProjectPost;
use App\Models\User;
use Illuminate\Http\Request;
use SebastianBergmann\CodeCoverage\Report\Xml\Project;

class DiaryController extends Controller
{
    public function add(Request $request, $id)
    {
        $project = ProjectPost::query()
            ->where('id', $id)
            ->where('deleted_at', null)
            ->first();

        if($project == null){
            return response()->json("Project post for diary not found", 404);
        }

        $diary = new Diary();

        $diary->comment = $request->comment ?? null;
        $diary->user_id = $request->user()->id ?? null;

        $diary->save();

        $diary->project()->associate($project)->save();

        return response()->json($diary, 200);
    }


    public function getByProjectId(Request $request, $id)
    {
        $project = ProjectPost::query()
            ->where('id', $id)
            ->first();

        if($project == null){
            return response()->json("Project post for diary not found", 404);
        }

        $diary = Diary::query()
            ->where('project_id', $project->id)
            ->orderBy('created_at')
            ->with(['user' => function($user) 
            {
                $user->select(
                    [
                        'id','name','image'
                    ]
                );
            }
            ])
            ->get();

        if($diary == null){
            return response()->json("Diaries of post project not found", 404);
        }

        return response()->json($diary, 200);
    }
    

    public function deleteById(Request $request, $id)
    {
        $diary = Diary::query()
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if($diary == null){
            return response()->json('Comment not found', 404);
        }

        $diary->delete();

        return response()->json('Comment successfully deleted', 200);
    }
}

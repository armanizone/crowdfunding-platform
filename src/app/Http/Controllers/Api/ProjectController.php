<?php

namespace App\Http\Controllers\Api;

use \App\Http\Resources\ProjectResource;
use App\Models\Category;
use App\Models\ProjectHistory;
use App\Models\ProjectPost;
use App\Models\Projects;
use App\Models\ProjectReward;
use App\Models\ProjectUpdate;
use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function create(Request $request)
    {
        $project    =   new Projects;

        $project->id = IdGenerator::generate(['table' => 'projects', 'length' => 9, 'prefix' =>date('ymd')]);

        $project->user_id               =   $request->user()->id            ?? null;

        if( $request->file('image'))
        {
            $project->image = $this->uploadFile($request->file('image'), $project->id.'/details', '1-Main-');
        }
        $project->title                 =   $request->title                 ?? null;
        $project->days                  =   $request->days                  ?? null;
        $project->short_description     =   $request->short_description     ?? null;
        $project->city_id               =   $request->city_id               ?? null;
        $project->video_or_animation    =   $request->video_or_animation    ?? null;
        $project->detail_description    =   $request->detail_description    ?? null;
        $project->author                =   $request->author                ?? null;
        $project->author_last_name      =   $request->author_last_name      ?? null;
        $project->author_patronymic     =   $request->author_patronymic     ?? null;
        $project->author_city_id        =   $request->author_city_id        ?? null;
        $project->iin                   =   $request->iin                   ?? null;
        $project->phone                 =   $request->phone                 ?? null;
        
        if( $request->file('document_front') )
        {
            $project->document_front = $this->uploadFile($request->file('document_front'), $project->id.'/verify', '1-Doc-');
        }
        if( $request->file('document_back') )
        {
            $project->document_back = $this->uploadFile($request->file('document_back'), $project->id.'/verify', '2-Doc-');
        }

        $project->save();

        return response()->json( new ProjectResource( $project ) , 200 );
    }


    public function update(Request $request)
    {
        $project    =   Projects::where( 'id' , $request->id )
        ->where('user_id', $request->user()->id)
        ->where('on_moderation', 0)
        ->first();

        if( $request->file('image'))
        {
            $project->image = $this->uploadFile($request->file('image'), $project->id.'/details', '1-Main-');
        }

        $project->title                 =   $request->title                 ;
        $project->short_description     =   $request->short_description     ;
        $project->city_id               =   $request->city_id               ;
        $project->sum_of_money          =   $request->sum_of_money          ;
        $project->days                  =   $request->days                  ;
        $project->video_or_animation    =   $request->video_or_animation    ;
        $project->detail_description    =   $request->detail_description    ?? ( $project->detail_description ?? null );

        $project->update();

        return response()->json( $project , 200 );
    }


    public function verification(Request $request)
    {
        $project    =   Projects::where( 'id' , $request->id )
        ->where('user_id', $request->user()->id)
        ->where('on_moderation', 0)
        ->first();

        $project->author                =   $request->author                ?? ( $project->author ?? null );
        $project->author_last_name      =   $request->author_last_name      ?? ( $project->author_last_name ?? null );
        $project->author_patronymic     =   $request->author_patronymic     ?? ( $project->author_patronymic ?? null );
        $project->author_city_id        =   $request->author_city_id        ?? ( $project->author_city_id ?? null );
        $project->iin                   =   $request->iin                   ?? ( $project->iin ?? null ) ;
        $project->phone                 =   $request->phone                 ?? ( $project->phone ?? null );
        if( $request->file('document_front') )
        {
            if( File::exists(public_path( $project->document_front )) )
            {
                File::delete(public_path( $project->document_front ));
            }
            $project->document_front = $this->uploadFile($request->file('document_front'), $project->id.'/verify', '1-Doc-');
        }
        if( $request->file('document_back') )
        {
            if( File::exists(public_path( $project->document_back )) )
            {
                File::delete(public_path( $project->document_back ));
            }
            $project->document_back = $this->uploadFile($request->file('document_back'), $project->id.'/verify', '2-Doc-');
        }

        $project->update();

        return response()->json( $project , 200 );
    }


    public function uploadImage(Request $request, $id) {
        $image = $this->uploadFile($request->file('file'), $id.'/details', '2-Editor-');
        return response()->json( ['location'=>"$image"] , 200 );
    }
    

    public function getAllRawProjects(Request $request){
        $projects = Projects::query()
            ->where('on_moderation', 0)
            ->where('deleted_at', null)
            ->with(['user' => function($user) 
            {
                $user->select(
                    [
                        'id','name','image', 'email', 'telephone'
                    ]
                );
            }
            ])
            ->get();

        if($projects == null){
            return response()->json("Projects not found", 404);
        }

        return response()->json( ProjectResource::collection( $projects ), 200 );
    }


    public function getProjectById(Request $request, $id){
        $project = Projects::query()
            ->where('on_moderation', 0)
            ->where('deleted_at', null)
            ->where('id', $id)
            ->first();

        if($project == null){
            return response()->json("Projects not found", 404);
        }

        return response()->json( $project , 200 );
    }


    public function getProjectByUser(Request $request){
        $project   =   Projects::query()
            ->where( 'user_id' , $request->user()->id )
            ->where( 'deleted_at', null)
            ->get();

        if($project == null){
            return response()->json("Project not found", 404);
        }

        return response()->json( ProjectResource::collection( $project ) , 200 );
    }


    public function deleteRawProjectById(Request $request, $id){
        $project = Projects::query()
            ->where('on_moderation', 0)
            ->where('id', $id)
            ->first();

        if($project == null){
            return response()->json("Projects to delete not found", 404);
        }

        $project->delete();

        return response()->json( 'Project successfully deleted' , 200 );
    }


    public function sendToReject(Request $request){
        $project = Projects::query()
            ->where('on_moderation', 1)
            ->where('id', $request->project_id)
            ->first();

        if($project == null){
            return response()->json("Projects to delete not found", 404);
        }

        $project->update([
            "on_moderation" => 0
        ]);

        $noti = new Notification();
        $noti->user_id      = $project->user_id;
        $noti->title        = "Проект " .$project->title. " не прошел модерацию";
        $noti->definition   = "Ваш проект не прошел модерацию попробуйте сменить заполняемые поля.";
        $noti->save();

        return response()->json( 'Project successfully rejected' , 200 );
    }

    
    public function sendToModerate(Request $request, $id){
        $project = Projects::query()
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->where('on_moderation', 0)
            ->where('deleted_at', null)
            ->first();

        if($project == null){
            return response()->json("Project to moderate not found", 404);
        }

        $validate_data = [
            'title'                 =>      $project->title,
            'image'                 =>      $project->image,
            'short_description'     =>      $project->short_description,
            'sum_of_money'          =>      $project->sum_of_money,
            'days'                  =>      $project->days,
            'detail_description'    =>      $project->detail_description,
            'author'                =>      $project->author,
            'author_last_name'      =>      $project->author_last_name,
            'author_patronymic'     =>      $project->author_patronymic,
            'author_city_id'        =>      $project->author_city_id,
            'iin'                   =>      $project->iin,
            'phone'                 =>      $project->phone,
            'document_front'        =>      $project->document_front,
            'document_back'         =>      $project->document_back,
        ];

        $rules = [
            'title'                 =>      'required',
            'image'                 =>      'required',
            'short_description'     =>      'required',
            'sum_of_money'          =>      'required',
            'days'                  =>      'required',
            'detail_description'    =>      'required',
            'author'                =>      'required',
            'author_last_name'      =>      'required',
            'author_patronymic'     =>      'required',
            'author_city_id'        =>      'required',
            'iin'                   =>      'required',
            'phone'                 =>      'required',
            'document_front'        =>      'required',
            'document_back'         =>      'required',
        ];

        $validator = Validator::make($validate_data, $rules);
        $errors = $validator->errors();
        
        if ($validator->fails()) {
            return response()->json($errors , 404);
        }

        $project->update([
            "on_moderation" => 1
        ]);

        return (new ProjectResource( $project ))
        ->response()
        ->setStatusCode(200);
    }


    public function getAllOnModeration(Request $request)
    {
        $project    =   Projects::query()
            ->where( 'on_moderation', 1)
            ->where('deleted_at', null)
            ->with(['user' => function($user) 
            {
                $user->select(
                    [
                        'id','name','image', 'email', 'telephone'
                    ]
                );
            }
            ])
            ->get();

        if($project == null){
            return response()->json("Projects on moderation not found", 404);
        }

        return response()->json( $project , 200 );
    }


    public function getByIdOnModeration(Request $request, $id)
    {
        $project    =   Projects::query()
            ->where( 'on_moderation', 1)
            ->where('deleted_at', null)
            ->where( 'id' , $id)
            ->first();

        if($project == null){
            return response()->json("Project by id on moderation not found", 404);
        }

        return (new ProjectResource( $project ))
            ->response()
            ->setStatusCode(200);
    }


    public function getOnModerationByUser(Request $id){
        $project   =   Projects::query()
            ->where( 'on_moderation', 1)
            ->where( 'deleted_at', null)
            ->where( 'user_id' , $id->user()->id )
            ->get();

        if($project == null){
            return response()->json("Projects on moderation by user not found", 404);
        }

        return response()->json( ProjectResource::collection( $project ) , 200 );
    }


    public function moderatePost(Request $request, $id){
        $project = Projects::query()
            ->where('id', $id)
            ->where('on_moderation', 1)
            ->first();

        if($project == null){
            return response()->json("Project not found", 404);
        }

        $projectPost = new ProjectPost();

        $projectPost->id                 =   $project->id;
        $projectPost->user_id            =   $project->user_id;
        $projectPost->title              =   $project->title;
        $projectPost->sum_of_money       =   $project->sum_of_money;
        $projectPost->closed_at          =   $project->closed_at;
        $projectPost->category_id        =   $request->category;
        $projectPost->days               =   $project->days;
        $projectPost->city_id            =   $project->city_id;
        $projectPost->image              =   $project->image;
        $projectPost->short_description  =   $project->short_description;
        $projectPost->video_or_animation =   $project->video_or_animation;
        $projectPost->detail_description =   $project->detail_description;
        $projectPost->author             =   $project->author;
        $projectPost->author_last_name   =   $project->author_last_name;
        $projectPost->author_patronymic  =   $project->author_patronymic;
        $projectPost->author_city_id     =   $project->author_city_id;
        $projectPost->iin                =   $project->iin;
        $projectPost->phone              =   $project->phone;
        $projectPost->document_front     =   $project->document_front;
        $projectPost->document_back      =   $project->document_back;

        $projectPost->save();
        
        $project->update([
            'deleted_at' => Carbon::now(),
        ]);
        #END# Project Post

        $project_reward =   new ProjectReward;

        $project_reward->project_id     =   $projectPost->id;
        $project_reward->name           =   $request->name          ?? ('Благотворительная поддержка') ;
        $project_reward->bought         =   (0) ;
        $project_reward->description    =   $request->description   ?? null ;
        $project_reward->save();

        $noti = new Notification();
        $noti->user_id      = $project->user_id;
        $noti->title        = "Проект " .$project->title. " успешно прошел модерацию!";
        $noti->definition   = 'Поздравляем ваш проект одобрен! Теперь вы можете запустить его во вкладке "Ваши проекты", для сбора средств.';
        $noti->save();

        return response()->json( [new ProjectResource( $projectPost ) , $project_reward], 200 );

    }
}
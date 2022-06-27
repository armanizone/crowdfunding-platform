<?php

namespace App\Http\Controllers\Api;

use \App\Models\ProjectReward;
use \App\Models\ProjectPayment;
use \App\Models\ProjectPost;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use \App\Http\Resources\RewardResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Image;

class ProjectRewardController extends Controller
{
    public function create(Request $request)
    {
        $rules = [
            'project_id'    =>  'required|exists:projects,id',
            'name'          =>  'required',
            'image'         =>  'required',
            'cost'          =>  'required|numeric',
            'total'         =>  'required|numeric',
            'description'   =>  'required',
            'date_sending'  =>  'required'
        ];

        $messages = [
            //
        ];

        $validator = $this->validator($request->All(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors()->first(),400,['charset'=>'utf-8'],JSON_UNESCAPED_UNICODE);
        }

        $project_reward =   new ProjectReward;
        $project_reward->project_id     =   $request->project_id;
        $project_reward->name           =   $request->name;
        
        if( $request->file('image'))
        {
            $project_reward->image = $this->uploadFile($request->file('image'), $request->project_id.'/rewards', '3-rwd-');
        }
        $project_reward->cost           =   $request->cost;
        $project_reward->total          =   $request->total;
        $project_reward->description    =   $request->description;
        $project_reward->bought         =   $request->bought            ?? ( $project_reward->bought        ?? 0 );
        $project_reward->send           =   $request->send              ?? ( $project_reward->send          ?? 0 );
        $project_reward->take_city      =   $request->take_city         ?? ( $project_reward->take_city     ?? null );
        $project_reward->take_adress    =   $request->take_adress       ?? ( $project_reward->take_adress   ?? null );
        $project_reward->take_phone     =   $request->take_phone        ?? ( $project_reward->take_phone    ?? null );
        $project_reward->letter         =   $request->letter            ?? ( $project_reward->letter        ?? null );
        $project_reward->how_to_get     =   $request->how_to_get        ?? ( $project_reward->how_to_get    ?? null );
        $project_reward->date_sending   =   $request->date_sending;
        $project_reward->save();

        return response()->json( $project_reward , 200 );
    }


    public function update(Request $request)
    {
        $project_reward   =   ProjectReward::query()
        ->where( 'id' , $request->id )
        ->where( 'bought', 0)
        ->first();

        $project_reward->name           =   $request->name;

        if( $request->file('image') )
        {
            if( File::exists(public_path( $project_reward->image )))
            {
                File::delete(public_path( $project_reward->image ));
            }
            $project_reward->image = $this->uploadFile($request->file('image'), $request->project_id.'/rewards', 'rwd-');
        }
        
        $project_reward->cost           =   $request->cost;
        $project_reward->total          =   $request->total;
        $project_reward->description    =   $request->description;
        $project_reward->bought         =   $request->bought        ?? ( $project_reward->bought        ?? 0 );
        $project_reward->send           =   $request->send          ?? ( $project_reward->send          ?? 0 );
        $project_reward->take_city      =   $request->take_city     ?? ( $project_reward->take_city     ?? null );
        $project_reward->take_adress    =   $request->take_adress   ?? ( $project_reward->take_adress   ?? null );
        $project_reward->take_phone     =   $request->take_phone    ?? ( $project_reward->take_phone    ?? null );
        $project_reward->letter         =   $request->letter        ?? ( $project_reward->letter        ?? null );
        $project_reward->how_to_get     =   $request->how_to_get    ?? ( $project_reward->how_to_get    ?? null );
        $project_reward->date_sending   =   $request->date_sending;
        $project_reward->update();

        return response()->json( $project_reward , 200 );
    }


    public function get(Request $request)
    {  
        $project_reward   =   ProjectReward::query()
        ->where( 'id' , $request->id )
        ->first();

        return response()->json( $project_reward , 200 );
    }


    public function getByProjectId(Request $request, $id)
    {
        $rewards    =   ProjectReward::query()->where( 'project_id' , $id)->get();
        if($rewards == null)
        {
            return response()->json( "Rewards not found by project id", 404);
        }

        return response()->json( RewardResource::collection( $rewards ) , 200 );
    }


    public function deleteReward(Request $request, $id)
    {
        $project = ProjectPost::query()
            ->where( 'user_id' , $request->user()->id )
            ->first();

        if($project == null)
        {
            return response()->json( "User for reward deleted not found", 404);
        }

        $project_rewards = ProjectReward::where( 'id' , $id )->first();

        $project_rewards->delete();

        return response()->json( 'Reward successfully deleted' , 200 );
    }


    public function getBought(Request $request){
        $reward = ProjectReward::query()
            ->whereIn('id',
                ProjectPayment::query()
                ->pluck('reward_id')
            )->get();

        return response()->json($reward, 200);
    }
    public function getNotBought(Request $request){
        $reward = ProjectReward::query()
            ->whereNotIn('id',
                ProjectPayment::query()
                ->pluck('reward_id')
            )->get();

        return response()->json($reward, 200);
    }
}

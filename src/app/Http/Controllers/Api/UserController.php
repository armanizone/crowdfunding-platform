<?php

namespace App\Http\Controllers\Api;

use \App\Mail\UserMail;
use \App\Mail\UserPasswordMail;
use \App\Models\User;
use \App\Models\ProjectPayment;
use \App\Models\Transaction;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use \App\Http\Resources\UserResource;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use \Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Image;


class UserController extends Controller
{
    public function userImage(Request $request){
    if($request->file('image'))
    {
        $user = User::query()->where('id', $request->user()->id)->first();
        $file = $request->file('image');

        if( File::exists(public_path( $user->image)) )
        {
            File::delete(public_path( $user->image ));
        }

        $file_name          =   date('mdh'). $file->getClientOriginalName();
        $ImagePath          =   storage_path('app/public/avatars');
        File::isDirectory($ImagePath) or File::makeDirectory($ImagePath, 0777, true, true);
        $image_resize       =   Image::make($file->getRealPath());
        $image_resize       ->  resize(200, 200, function ($constraint) 
        {$constraint        ->  aspectRatio();
        $constraint         ->  upsize();
        })                  ->  save($ImagePath. '/' .$file_name);

        $image = "/storage/avatars/$file_name";  
        $user->image = $image;
        $user->save();

        return response()->json($user->image, 200);
    }
    }


    public function getAll(Request $request){
        $users = User::query()
        ->with('roles')
        ->get();

        if($users == null){
            return response()->json("Users not found", 404);
        }

        return response()->json($users, 200);
    }


    public function getUsersResource(Request $request){
        $project_payment = ProjectPayment::query()
            ->where('project_id', $request->project_id);
        
        if($project_payment == null){
            return response()->json("Project payment not found", 404);
        }

        $users = User::query()
            ->whereIn('id', $project_payment->pluck('user_id'))
            ->get();

        if($users == null){
            return response()->json("Users not found", 404);
        }

        return response()->json(UserResource::collection($users), 200);
    }


    public function getUserBy($param){
        $user = User::query()
            ->where('id', $param)
            ->orWhere('email', $param)
            ->first(['id', 'email', 'image', 'name']);

        if($user == null){
            return response()->json("Users not found", 404);
        }

        return response()->json($user , 200);
    }
    

    public function ToWallet(Request $request)
    {
        if($request->password != '(Za-(*+(nSw4c=u#')
        {
            return response()->json("Password not correct", 404);
        }

        $user = User::query()
        ->orWhere('id', $request->id)
        ->orWhere('email', $request->email)
        ->first();

        if($user == null){
            return response()->json("Users not found", 404);
        }

        if($request->tokens <= 0)
        {
            return response()->json("Tokens is mismatch, minimun 1 token needs" , 404);
        }
        $sum = $request->tokens * 1000;
        $user->wallet = $sum + $user->wallet;

        $transaction = new Transaction;
        $transaction->id            =   IdGenerator::generate(['table' => 'transactions', 'length' => 11, 'prefix' =>date('ymd')]);
        $transaction->user_id       =   $user->id;
        $transaction->email         =   $user->email;
        $transaction->tokens        =   $request->tokens;
        $transaction->sum           =   $sum;
        $transaction->user_wallet   =   $user->wallet;
        $transaction->save();

        $user->save();

        return response()->json($transaction, 200);
    }





}




    // ОБНОВЛЕНИЕ ПРОФИЛЯ ИДЕТ ЧЕРЕЗ FORTIFY UPDATEUSERPROFILEINFORMATION
    // public function edit(Request $request)
    // {
    //     $rules = [
    //         'id'        =>  'required|exists:users,id',
    //         'city_id'   =>  'exists:cities,id'
    //     ];

    //     $messages = [
    //         //
    //     ];

    //     $validator = $this->validator($request->all(),$rules,$messages);

    //     if ($validator->fails()) {
    //         return response()->json($validator->errors()->first(),400,['charset'=>'utf-8'],JSON_UNESCAPED_UNICODE);
    //     }

    //     $user   =   User::where( 'id' , $request->id )->first();

    //     $user->name         =   $request->name          ?? $user->name;
    //     $user->city_id      =   $request->city_id       ?? $user->city_id;
    //     $user->telephone    =   $request->telephone     ?? $user->telephone;

    //     if( $request->image )
    //     {
    //         if( \File::exists( $user->image ) )
    //         {
    //             \File::delete( $user->image );
    //         }

    //         $user->image = $this->uploadFile($request->image,'users');
    //     }

    //     if( isset( $request->password_old ) && isset( $request->password_new ) )
    //     {
    //         if( !\Hash::check( $request->password_old , $user->password ) )
    //         {
    //             return response()->json( 'Неверный пароль' , 400 , [ 'charset' => 'utf-8' ] , JSON_UNESCAPED_UNICODE );
    //         }

    //         $user->password = bcrypt($request->password_new);
    //     }

    //     $user->save();

    //     return response()->json(  $user  ,200 , [ 'charset' => 'utf-8' ] , JSON_UNESCAPED_UNICODE );
    // }

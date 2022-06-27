<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Validator;
use Image;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    function validator($errors,$rules,$messages = []) {
        return Validator::make($errors,$rules,$messages);
    }

    protected function uploadFile($file, $projectPath, $prefix){
        if (isset($file)){
            $file_name          =   $prefix. date('dm'). $file->getClientOriginalName();
            $ImagePath          =   storage_path('app/public/projects/' .$projectPath);
            File::isDirectory($ImagePath) or File::makeDirectory($ImagePath, 0777, true, true);

            $image_resize       =   Image::make($file->getRealPath());
            $image_resize       ->  resize(650, 650, function ($constraint) 
            {$constraint        ->  aspectRatio();
            $constraint         ->  upsize();
            })                  ->  save($ImagePath. '/' .$file_name);
            
            return "/storage/projects/$projectPath/$file_name";
        }
    }

    protected function deleteFile($path){
        if (File::exists($path)) {
            File::delete($path);
            return true;
        }

    }
    function paginate($Model,$Resource,$page ,$limit ){
        $count = $Model->count();
        $pages = ceil($count / $limit);
        $offset = ($page - 1)  * $limit;
        return [
            'count'=>$count,
            'pages'=>$pages,
            'offset'=>$offset,
            'limit'=>$limit,
            'page'=>(int)$page,
            'data'=> $Resource::collection( $Model->offset($offset)->limit($limit)->get()->unique() )
        ];

    }
}

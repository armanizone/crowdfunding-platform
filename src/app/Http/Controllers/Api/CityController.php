<?php

namespace App\Http\Controllers\Api;

use \App\Http\Resources\CityResource;
use \App\Models\City;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;

class CityController extends Controller
{
    public function get(Request $request)
    {
        $cities = City::all();

        return response()->json( CityResource::collection( $cities ) , 200 , [ 'charset' => 'utf-8' ] , JSON_UNESCAPED_UNICODE );
    }

    public function create(Request $request)
    {
        $rules = [
            'name'  =>  'required'
        ];

        $messages = [
            // 
        ];

        $validator = $this->validator($request->all(),$rules,$messages);

        if ($validator->fails()) {
            return response()->json($validator->errors()->first(),400,['charset'=>'utf-8'],JSON_UNESCAPED_UNICODE);
        }

        $city   =   new City;

        $city->name = $request->name;
        $city->save();
        
        return response()->json( new  CityResource( $city ) , 200 , [ 'charset' => 'utf-8' ] , JSON_UNESCAPED_UNICODE );
    }
    

    public function delete(Request $request, $id )
    {
        $rules = [
            // 
        ];

        $messages = [
            // 
        ];

        $validator = $this->validator($request->all(),$rules,$messages);

        if ($validator->fails()) {
            return response()->json($validator->errors()->first(),400,['charset'=>'utf-8'],JSON_UNESCAPED_UNICODE);
        }

        $city = City::where( 'id' , $id )->first();

        $city->delete();

        return response()->json( [ 'status' => true ] , 200 );
    }


    public function update(Request $request , $id)
    {
        $rules = [
            'name'  =>  'required'
        ];

        $messages = [
            // 
        ];

        $validator = $this->validator($request->all(),$rules,$messages);

        if ($validator->fails()) {
            return response()->json($validator->errors()->first(),400,['charset'=>'utf-8'],JSON_UNESCAPED_UNICODE);
        }

        $city = City::where( 'id' , $id )->first();
        
        $city->name = $request->name;
        $city->save();

        return response()->json( new CityResource( $city ) , 200 , [ 'charset' => 'utf-8' ] , JSON_UNESCAPED_UNICODE );
    }
}

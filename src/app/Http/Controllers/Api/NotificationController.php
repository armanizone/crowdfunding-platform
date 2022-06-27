<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\User;


class NotificationController extends Controller
{
    public function addNoti(Request $request){
        $user = User::query()->where('id', $request->user_id)->first();

        if($user == null)
        {return response()->json("User not found", 404);}

        $noti = new Notification();
        $noti->user_id      = $user->id                 ?? null;
        $noti->title        = $request->title           ?? null;
        $noti->definition   = $request->definition      ?? null;

        $noti->save();

        return response()->json($noti, 200);
    }


    public function getByUser(Request $request){
        $noti = Notification::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($noti, 200);
    }


    public function readNoti(Request $request){
        $noti = Notification::query()
            ->where('user_id', $request->user()->id)
            ->get();

        if($noti == null){
            return response()->json("Notifications not found", 200);
        }

        $noti = Notification::query()
            ->where('user_id', $request->user()->id)
            ->update([
                'read' => 1
            ]);

        return response()->json(
            ['message' => "Notifications is readed"] , 200);
    }
    

    public function deleteById(Request $request, $id){
        $noti = Notification::query()
            ->where('id', $id)
            ->first();

        if($noti == null){
            return response()->json("Notification not found", 404);
        }

        $noti->delete();

        return response()->json( 'Notification successfully deleted' , 200 );
    }

}

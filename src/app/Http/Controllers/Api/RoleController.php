<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    public function get(Request $request)
    {
        $role = Auth::user()->roles()->first();
        if($role == null){
            return response()->json('Роли не прикреплены', 204);
        }
        $exDate = Auth::user()->roles->where('slug', $role->slug)->first()->pivot->expire_date;
        if($exDate > Carbon::now() || $exDate == null)
            return response()->json( RoleResource::make( $role ), 200 );
        else
            return response()->json("No Roles", 404 );
    }


    public function getByUserId(Request $request, $id)
    {
        $role = User::query()->find($id)->roles()->first();
        $exDate = Auth::user()->roles->where('slug', $role->slug)->first()->pivot->expire_date;
        if($role == null){
            return response()->json('Роли не прикреплены', 204);
        }
        if($exDate > Carbon::now() || $exDate == null)
            return response()->json( RoleResource::make( $role ), 200 );
        else
            return response()->json("No Roles", 404 );
    }


    public function setRole(Request $request)
    {
        $user = User::query()->find($request->user_id);
        if($user == null){
            return response()->json('Пользователь не найден!', 404);
        }

        $role = Role::query()->where('slug', $request->role)->first();
        if($role == null){
            return response()->json('Данной роли не существует', 204);
        }

        $user->roles()->detach();
        if ($request->month == null)
        {
            $user->roles()->attach($role, ['expire_date' => null]);
            return response()->json("Роль успешно присвоена навсегда", 200);
        }
        
        $user->roles()->attach($role, ['expire_date' => Carbon::now()->addMonth($request->month)]);

        return response()->json("Роль успешно присвоена на время", 200);
    }


    public function removeRole($id)
    {
        $user = User::query()->find($id);
        if($user == null){
            return response()->json('Пользователь не найден!', 404);
        }
        $user->roles()->detach();
        return response()->json("Роль успешно откреплена", 200);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\PaymentResource;
use App\Http\Resources\UserResource;
use App\Models\ProjectReward;
use App\Models\ProjectPost;
use App\Models\User;
use App\Models\ProjectPayment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Carbon\Carbon;

class ProjectPaymentController extends Controller
{
    public function create(Request $request)
    {        
        $rules = [
            'user_id'       =>  'required|exists:users,id',
            'project_id'    =>  'required|exists:projects,id',
            'reward_id'     =>  'required|exists:project_rewards,id',
            'sum'           =>  'required|numeric'
        ];

        $messages = [
            //
        ];
        
        $validator = $this->validator($request->all(),$rules,$messages);
 
        if ($validator->fails()) {
            return response()->json($validator->errors()->first(),400,['charset'=>'utf-8'],JSON_UNESCAPED_UNICODE);
        }

        $user   =   User::where( 'id' , $request->user()->id )->first();

        $user_wallet_balance = $user->wallet;

        $total_sum = (int)$request->sum * (int)$request->count;
        
        if( (int)$user_wallet_balance < (int)$total_sum )
        {
            return response()->json( 'Недостаточно средств на счету' , 400 , ['charset'=>'utf-8'], JSON_UNESCAPED_UNICODE );
        }
        // #Завершилась проверка баланса пользователя

        $reward = ProjectReward::query()
            ->where('id', $request->reward_id)
            ->first();

        if($reward->total >= 1)
        {
            $total = $reward->total - $reward->bought;
            if($total < $request->count)
            {
                return response()->json( 'Вы запросили слишком много вознаграждения' , 400 , ['charset'=>'utf-8'], JSON_UNESCAPED_UNICODE );
            }
        }

        $reward->update([
            'bought' => $reward->bought + $request->count
        ]);

        $project_payment    =   new ProjectPayment;
        $project_payment->id            =   IdGenerator::generate(['table' => 'project_payments', 'length' => '12', 'prefix' =>date('ymdhis')]);
        $project_payment->user_id       =   $request->user_id;
        $project_payment->project_id    =   $request->project_id;
        $project_payment->reward_id     =   $request->reward_id;
        $project_payment->sum           =   $request->sum;
        $project_payment->count         =   $request->count;
        $project_payment->FIO           =   $request->FIO;
        $project_payment->phone         =   $request->phone;
        $project_payment->region        =   $request->region;
        $project_payment->city          =   $request->city;
        $project_payment->street        =   $request->street;
        $project_payment->house_number  =   $request->house_number;
        $project_payment->apartment     =   $request->apartment;
        $project_payment->mail_index    =   $request->mail_index;
        $project_payment->comment       =   $request->comment;
        $project_payment->response      =   $request->response;
        $project_payment->total_sum     =   $total_sum;

        $user_wallet_balance    =   (int)$user->wallet - (int)$total_sum;

        $projects = ProjectPost::query()
            ->where('id', $project_payment->project_id)
            ->first();
        $projects->update([
            'collected_money' => $projects->collected_money + $project_payment->total_sum
        ]);

        $project_payment->save();

        $user->wallet   =   $user_wallet_balance;
        $user->save();

        return response()->json( $project_payment , 200 );
    }


    public function getAllPayments()
    {
        $payments = ProjectPayment::query()
            ->with('user', 'project', 'reward')
            ->get();

        if($payments == null)
        {
            return response()->json("All payments not found", 404);
        }

        return response()->json($payments, 200);
    }


    public function getByProjectId(Request $request)
    {
        $project = ProjectPost::query()
            ->where('id', $request->project_id)
            ->where('user_id', $request->user()->id)
            ->first();
        $project_id = $project->id;    

        $payments = ProjectPayment::query()
            ->with(['user' => function($user) 
            {
                $user->select(
                    [
                        'id','name','image', 'email'
                    ]
                );
            }, 'project' => function($project)
            {
                $project->select(
                    [
                        'id', 'title', 'image', 'short_description'
                    ]);
            }, 'reward' => function($reward) {
                $reward;
            }
            ])
            ->where('project_id', $project_id)
            ->where('deleted_at', null)->get();

        if($payments == null)
        {
            return response()->json("Payments by project id not found", 404);
        }

        return response()->json($payments, 200);
    }


    public function getActiveByUser(Request $request)
    {
        $project = ProjectPost::query()->where('confirmed', 0)->orWhere('confirmed', 1);
        if($project == null)
        {
            return response()->json("Project not found" , 404);
        }

        $payments = ProjectPayment::query()
            ->where('user_id', $request->user()->id)
            ->whereIn('project_id', $project->pluck('id'))
            ->where('deleted_at', null)->get();

        return response()->json( PaymentResource::collection ($payments) , 200);
    }


    public function getEndedByUser(Request $request)
    {
        $project = ProjectPost::query()->where('confirmed', 2);
        if($project == null)
        {
            return response()->json("Project not found" , 404);
        }

        $payments = ProjectPayment::query()
            ->where('user_id', $request->user()->id)
            ->whereIn('project_id', $project->pluck('id'))
            ->where('deleted_at', null)
            ->get();

        return response()->json( PaymentResource::collection ($payments) , 200);
    }


    public function deletePayment(Request $request)
    {
        $user   =   User::where( 'id' , $request->user()->id )->first();

        $payment = ProjectPayment::query()
            ->where('id', $request->payment_id)
            ->where('project_id', $request->project_id)
            ->where('user_id', $user->id)
            ->where('deleted_at', null)
            ->first();

        if($payment == null)
        {
            return response()->json("Payment not found" , 404);
        }

        $reward = ProjectReward::query()
            ->where('id', $payment->reward_id)
            ->first();

        if($reward->bought <= 0)
        {
            return response()->json("Payment already returned" , 404);
        }

        $reward->update([
            'bought' => $reward->bought - $payment->count
        ]);

        $user->wallet = $user->wallet + $payment->total_sum;
        $payment->deleted_at    =  Carbon::now();
        $payment->save();
        $user->save();
        
        return response()->json([ $payment, $user->wallet ], 200);
    }
}

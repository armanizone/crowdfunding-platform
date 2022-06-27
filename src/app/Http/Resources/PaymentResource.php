<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use \App\Models\User;
use \App\Models\ProjectPost;
use \App\Models\ProjectReward;


class PaymentResource extends JsonResource
{
    public function toArray($request)
    {
        $user           =   User::          where(  'id',   $this['user_id'])->first(['id', 'name', 'image', 'email']);
        $reward         =   ProjectReward:: where(  'id',   $this['reward_id'])->get(['id', 'project_id', 'name', 'image', 'description', 'cost', 'total', 'how_to_get', 'send', 'date_sending', 'letter', 'take_city']);
        $project        =   ProjectPost::   where(  'id',   $this['project_id'])->first(['id', 'title', 'image', 'short_description', 'confirmed', 'closed_at', 'deleted_at']);
        if($project->confirmed == 1)
        {
            $reward = ProjectReward:: where(  'id',   $this['reward_id'])->get();
        }

        return [
            'id'            =>  $this['id'],
            'user'          =>  $user,
            'project'       =>  $project,
            'reward'        =>  $reward,
            'sum'           =>  $this['sum'],
            'count'         =>  $this['count'],
            'total_sum'     =>  $this['total_sum'],
            'FIO'           =>  $this['FIO'],
            'phone'         =>  $this['phone'],
            'region'        =>  $this['region'],
            'city'          =>  $this['city'],
            'street'        =>  $this['street'],
            'house_number'  =>  $this['house_number'],
            'apartment'     =>  $this['apartment'],
            'mail_index'    =>  $this['mail_index'],
            'comment'       =>  $this['comment'],
            'response'      =>  $this['response'],
            'deleted_at'    =>  $this['deleted_at'],
            'created_at'    =>  $this['created_at'],
            'updated_at'    =>  $this['updated_at'],
        ];
    }
}

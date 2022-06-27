<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthorResourse extends JsonResource
{
    public function toArray($request)
    {
//        $reword_count       =   ProjectReward::where(   'project_id' ,  $this['id'] )->get()->count();
//        $collected_money    =   ProjectPayment::where(  'project_id' ,  $this['id'] )->sum('sum');
        return [
// //            'id'                    =>  $this['id'],
//             'user_id'               =>  $this['user_id'],
//             'title'                 =>  $this['title'],
//             'on_moderation'         =>  $this['on_moderation'],
//             'sum_of_money'          =>  $this['sum_of_money'],
//             'days'                  =>  $this['days'],
//             'recomended'            =>  $this['recomended'],
//             'category_id'           =>  $this['category_id'],
//             'city_id'               =>  $this['city_id'],
//             'image'                 =>  $this['image'],
//             'short_description'     =>  $this['short_description'],
//             'video_or_animation'    =>  $this['video_or_animation'],
//             'detail_description'    =>  $this['detail_description'],
//             'number_of_rewards'     =>  $this['number_of_rewards'],
//             'reword_count'          =>  $reword_count,
//             'collected money'       =>  $collected_money,
//             'closed_at'             =>  $this['closed_at'],
//             'deleted_at'            =>  $this['deleted_at'],
            'author'                =>  $this['author'],
            'author_last_name'      =>  $this['author_last_name'],
            'author_patronymic'     =>  $this['author_patronymic'],
            'author_city_id'        =>  $this['author_city_id'],
            'iin'                   =>  $this['iin'],
            'phone'                 =>  $this['phone'],
            'document_front'        =>  $this['document_front'],
            'document_back'         =>  $this['document_back'],
        ];
    }
}

<?php

namespace App\Http\Resources;

use \App\Models\Category;
use \App\Models\City;
use \App\Models\ProjectPayment;
use \App\Models\User;
use \App\Models\ProjectPost;
use \App\Models\Notification;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;


class ProjectResource extends JsonResource
{
    public function toArray($request)
    {
        // Проверяем завершенные проекты, если у проекта время окончания меньше чем Carbon::now то задается новая колонна confirmed
        $project            =   ProjectPost::query()->where('id', $this['id'])->where('closed_at', '<', Carbon::now())->first();
        $total_sum          =   ProjectPayment::where(  'project_id' ,  $this['id'] )->where('deleted_at', null)->sum('total_sum');

        if($project)
        {
            if($project->confirmed == 0)
            {
                $project->collected_money = $total_sum;

                if($project->sum_of_money >  $project->collected_money)
                {
                    $project->confirmed  =   2;
                    $noti = new Notification();
                    $noti->user_id      = $this['user_id'];
                    $noti->title        = "Проект " .$this['title']. " завершился";
                    $noti->definition   = "Ваш проект завершился не достигнув суммы для сбора, возможно запрашиваемая сумма была слишком высокой, или же не хватило количество дней, вы можете проанализировать свой проект постараться еще раз уже с новой презентацией!";
                    $noti->save();
                }
                else
                {
                    $project->confirmed  =   1;
                    $noti = new Notification();
                    $noti->user_id      = $this['user_id'];
                    $noti->title        = "Проект " .$this['title']. " успешно завершился!";
                    $noti->definition   = "Наши поздравления ваш проект собрал нужную сумму! Теперь вы можете посмотреть статус вашего проекта в личном кабинете, а так же посмотреть новый раздел деталей доставки вознаграждении вашим инвесторам!";
                    $noti->save();
                }
            }
            
            $project->save();
        }
        #END# Завершенные проекты

        $count              =   ProjectPayment::where(  'project_id' ,  $this['id'] )
        ->where('deleted_at', null)->count();

        $category           =   Category::      where(  'id',           $this['category_id'])->first(); 
        if($category) {$category = $category->name;}
        else{$category = $this['category_id'];}

        $city               =   City::          where(  'id',           $this['city_id'])->first(); 
        if($city) {$city = $city->name;}
        else {$city = $this['city'];}

        $user               =   User::          where(  'id',           $this['user_id'])->first(['id', 'name', 'image']);

        return [
            'id'                    =>  $this['id'],
            'user'                  =>  $user,
            'title'                 =>  $this['title'],
            'on_moderation'         =>  $this['on_moderation'],
            'sum_of_money'          =>  $this['sum_of_money'],
            'collected_money'       =>  $this['collected_money'],
            'total_sum'             =>  $total_sum,
            'closed_at'             =>  $this['closed_at'],
            'category_id'           =>  $category,
            'recomended'            =>  $this['recomended'],
            'days'                  =>  $this['days'],
            'city_id'               =>  $city,
            'image'                 =>  $this['image'],
            'short_description'     =>  $this['short_description'],
            'video_or_animation'    =>  $this['video_or_animation'],
            'detail_description'    =>  $this['detail_description'],
            'confirmed'             =>  $this['confirmed'],
            'baked'                 =>  $count,
            'deleted_at'            =>  $this['deleted_at'],
//            'author'                =>  $this['author'],
//            'author_last_name'      =>  $this['author_last_name'],
//            'author_patronymic'     =>  $this['author_patronymic'],
//            'author_city_id'        =>  $this['author_city_id'],
//            'iin'                   =>  $this['iin'],
//            'phone'                 =>  $this['phone'],
//            'document_front'        =>  $this['document_front'],
//            'document_back'         =>  $this['document_back'],
        ];
    }
}

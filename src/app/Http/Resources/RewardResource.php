<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RewardResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'            =>  $this['id'],
            'project_id'    =>  $this['project_id'],
            'name'          =>  $this['name'],
            'image'         =>  $this['image'],
            'description'   =>  $this['description'],
            'cost'          =>  $this['cost'],
            'total'         =>  $this['total'],
            'bought'        =>  $this['bought'],
            'how_to_get'    =>  $this['how_to_get'],
            'send'          =>  $this['send'],
            'take_city'     =>  $this['take_city'],
            'letter'        =>  $this['letter'],
            'date_sending'  =>  $this['date_sending'],
        ];
    }
}

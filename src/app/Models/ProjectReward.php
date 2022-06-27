<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectReward extends Model
{
    use HasFactory;

    protected $fillable = [
        'bought',
    ];

    public function payments(){
        return $this->hasMany(ProjectPayment::class, 'reward_id', 'id');
    }
}

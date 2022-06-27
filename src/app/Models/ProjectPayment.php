<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectPayment extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class,'user_id', 'id');
    }

    public function project()
    {
        return $this->belongsTo(ProjectPost::class,'project_id', 'id');
    }

    public function reward()
    {
        return $this->belongsTo(ProjectReward::class,'reward_id', 'id');
    }
}

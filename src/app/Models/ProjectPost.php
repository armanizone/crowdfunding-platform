<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'confirmed',
        'deleted_at',
        'closed_at'
    ];

    public $incrementing = false;

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function projectUpdates(){
        return $this->hasOne(ProjectUpdate::class, 'project_id', 'id');
    }

    public function projectHistories(){
        return $this->hasMany(ProjectHistory::class, 'project_id', 'id');
    }

    public function diaries(){
        return $this->hasMany(Diary::class, 'project_id', 'id');
    }

    public function payments(){
        return $this->hasMany(ProjectPayment::class, 'project_id', 'id');
    }
}

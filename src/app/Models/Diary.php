<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diary extends Model
{
    use HasFactory;

    public function project()
    {
        return $this->belongsTo(ProjectPost::class, 'project_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id', 'id');
    }
}

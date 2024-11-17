<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requests extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'date',
    ];

    public $timestamps = false;

    public function user() 
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

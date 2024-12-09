<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'fish_id',
        'user_id',
        'weight',
        'date',
    ];

    public $timestamps = false;

    public function fish() 
    {
        return $this->belongsTo(Fish::class, 'fish_id');
    }

    public function user() 
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

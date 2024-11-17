<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'fish_id',
        'path',
    ];

    public $timestamps = false;

    public function fish() 
    {
        return $this->belongsTo(Fish::class, 'fish_id');
    }

}

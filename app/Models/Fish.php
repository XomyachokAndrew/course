<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fish extends Model
{
    use HasFactory;
    protected $table = 'fishes';

    protected $fillable = [
        'fish_name_id',
        'user_id',
        'weight',
        'cost_per_kg',
    ];

    public $timestamps = false;

    public function fishName() 
    {
        return $this->belongsTo(FishName::class, 'fish_name_id');
    }

    public function photos() 
    {
        return $this->hasMany(Photo::class, 'fish_id');
    }

    public function user() 
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

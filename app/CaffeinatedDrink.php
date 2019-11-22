<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CaffeinatedDrink extends Model
{
    protected $table = 'caffeinated_drinks';    
    protected $appends = ['total_caffeine'];



    public function getTotalCaffeineAttribute()
    {
        return $this->caffeine_mg * $this->servings;
    }
    
}

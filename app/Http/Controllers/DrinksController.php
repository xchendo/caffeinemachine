<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DrinksController extends Controller
{
    public function index()
    {
        $drinks = \App\CaffeinatedDrink::all();
        
        return $drinks;
    }
}

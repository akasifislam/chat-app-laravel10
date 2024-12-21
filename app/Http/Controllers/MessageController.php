<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        $users = \App\Models\User::all();
        return response()->json($users);
    }
}

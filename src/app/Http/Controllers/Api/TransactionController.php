<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class TransactionController extends Controller
{
    public function getTransactions(Request $request)
    {
        $transaction = Transaction::query()->get();

        if($transaction == null){
            return response()->json("Transactions not found", 404);
        }

        return response()->json( $transaction, 200);
    }
    

    public function getByUser(Request $request)
    {
        $transaction = Transaction::query()->where( 'user_id', $request->user()->id )->get();

        if($transaction == null){
            return response()->json("User by transaction not found", 404);
        }

        return response()->json( $transaction, 200);
    }
}

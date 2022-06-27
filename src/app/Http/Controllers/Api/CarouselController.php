<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Carousel;
use \App\Http\Controllers\Controller;


class CarouselController extends Controller
{
    public function updateCarousel(Request $request)
    {
        $carousel = Carousel::query()
            ->where('id', $request->id)
            ->first();
        
        if($carousel == null)
        {
            return response()->json('Carousel not found', 404);
        }
        
        $carousel->title            =   $request->title;
        $carousel->description      =   $request->description;
        $carousel->image            =   $request->image;
        $carousel->link             =   $request->link;
        $carousel->save();

        return response()->json("Carousel $carousel has been changed successfully", 200);
    }


    public function getCarousel(Request $request)
    {
        $carousel = Carousel::query()->get();
        if($carousel == null)
        {
            return response()->json('Carousel not found', 404);
        }

        return response()->json( $carousel, 200);
    }
}

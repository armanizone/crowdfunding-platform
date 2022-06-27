<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarouselsTable extends Migration
{

    public function up()
    {
        Schema::create('carousels', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable();
            $table->text('description')->nullable();
            $table->text('link')->nullable();
            $table->text('image')->nullable();
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('carousels');
    }
}

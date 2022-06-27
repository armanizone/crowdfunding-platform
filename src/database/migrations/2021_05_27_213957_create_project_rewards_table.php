<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectRewardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_rewards', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('project_id');
            $table->text('name')->nullable();
            $table->text('image')->nullable();
            $table->text('description')->nullable();
            $table->integer('cost')->nullable();
            $table->integer('total')->nullable();
            $table->integer('bought')->default(0);
            $table->text('how_to_get')->nullable(); 

            $table->string('send')->default(0);
            $table->text('take_city')->nullable();
            $table->text('take_adress')->nullable();
            $table->string('take_phone')->nullable();
            $table->text('letter')->nullable(); 
            $table->date('date_sending')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_rewards');
    }
}

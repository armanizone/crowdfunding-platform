<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->text('title')->nullable();
            $table->text('image')->nullable();
            $table->text('short_description')->nullable();
            $table->text('video_or_animation')->nullable();
            $table->text('detail_description')->nullable();
            $table->bigInteger('collected_money')->default(0);
            $table->bigInteger('confirmed')->nullable();
            $table->bigInteger('days_left')->nullable();
            $table->index('user_id');
            $table->index('project_id');
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
        Schema::dropIfExists('project_histories');
    }
}

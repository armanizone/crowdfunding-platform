<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->nullable();
            $table->text('title')->nullable();
            $table->boolean('on_moderation')->default(0);
            $table->bigInteger('sum_of_money')->default(0);
            $table->integer('days')->nullable();
            $table->string('recomended')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->bigInteger('city_id')->nullable();
            $table->text('image')->nullable();
            $table->text('short_description')->nullable();
            $table->text('video_or_animation')->nullable();
            $table->text('detail_description')->nullable();
            $table->string('author')->nullable();
            $table->string('author_last_name')->nullable();
            $table->string('author_patronymic')->nullable();
            $table->bigInteger('author_city_id')->nullable();
            $table->bigInteger('iin')->nullable();
            $table->string('phone')->nullable();
            $table->text('document_front')->nullable();
            $table->text('document_back')->nullable();

            $table->index('category_id');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}

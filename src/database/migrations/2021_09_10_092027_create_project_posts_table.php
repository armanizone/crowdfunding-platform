<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->text('title')->nullable();
            $table->bigInteger('sum_of_money')->nullable();
            $table->bigInteger('collected_money')->default(0);
            $table->timestamp('closed_at')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('recomended')->nullable();
            $table->integer('days')->nullable();
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
            $table->integer('confirmed')->default(0);

            $table->index('user_id');
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
        Schema::dropIfExists('project_posts');
    }
}

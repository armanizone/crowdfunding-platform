<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_payments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->bigInteger('project_id');
            $table->bigInteger('reward_id');
            $table->bigInteger('sum')->nullable();
            $table->integer('count')->default(1);
            $table->bigInteger('total_sum')->nullable();
            $table->text('FIO')->nullable();
            $table->text('phone')->nullable();
            $table->text('region')->nullable();
            $table->text('city')->nullable();
            $table->text('street')->nullable();
            $table->string('house_number')->nullable();
            $table->string('apartment')->nullable();
            $table->string('mail_index')->nullable();
            $table->text('comment')->nullable();
            $table->text('response')->nullable();
            $table->timestamp('deleted_at')->nullable();
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
        Schema::dropIfExists('project_payments');
    }
}

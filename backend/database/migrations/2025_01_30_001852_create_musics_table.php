<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('musics', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('artist');
            $table->string('album')->nullable();
            $table->string('isrc')->unique();
            $table->string('platform');
            $table->string('track_id')->unique();
            $table->integer('duration');
            $table->dateTime('added_date');
            $table->unsignedBigInteger('added_by')->nullable();
            $table->string('url')->nullable();
            $table->timestamps();

            $table->foreign('added_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('musics');
    }
};

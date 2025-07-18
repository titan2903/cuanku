<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid(column: 'id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->string(column: 'name');
            $table->string(column: 'type');
            $table->string(column: 'account_number')->nullable();
            $table->string(column: 'account_owner')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};

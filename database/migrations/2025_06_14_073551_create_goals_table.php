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
        Schema::create('goals', function (Blueprint $table) {
            $table->uuid(column: 'id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->string(column: 'name', length: 255);
            $table->decimal(column: 'percentage', total: 5, places: 2)->default(0);
            $table->unsignedInteger(column:'nominal');
            $table->unsignedInteger(column:'monthly_saving')->default(0);
            $table->date(column: 'deadline');
            $table->unsignedInteger(column:'beginning_balance')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goals');
    }
};

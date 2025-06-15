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
        Schema::create('incomes', function (Blueprint $table) {
            $table->uuid(column: 'id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('budget_id')->constrained('budgets')->cascadeOnDelete();
            $table->date('date');
            $table->unsignedInteger(column: 'nominal')->default(0);
            $table->string(column: 'notes')->nullable();
            $table->string(column: 'month');
            $table->unsignedSmallInteger(column: 'year');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incomes');
    }
};

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
        Schema::create('expenses', function (Blueprint $table) {
            $table->uuid(column: 'id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('budget_id')->constrained(table: 'budgets')->cascadeOnDelete();
            $table->foreignUuid('payment_id')->constrained(table: 'payments')->cascadeOnDelete();
            $table->date('date');
            $table->string('description');
            $table->unsignedInteger(column: 'nominal')->default(0);
            $table->string('type');
            $table->string('notes')->nullable();
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
        Schema::dropIfExists('expenses');
    }
};

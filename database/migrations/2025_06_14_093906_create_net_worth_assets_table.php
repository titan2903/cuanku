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
        Schema::create('net_worth_assets', function (Blueprint $table) {
            $table->uuid(column: 'id')->primary();
            $table->foreignUuid('asset_id')->constrained()->cascadeOnDelete();
            $table->date(column: 'transaction_date');
            $table->unsignedInteger(column:'nominal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('net_worth_assets');
    }
};

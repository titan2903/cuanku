<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\LiabilityController;
use App\Http\Controllers\NetWorthAssetController;
use App\Http\Controllers\NetWorthController;
use App\Http\Controllers\NetWorthLiabilityController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get(uri: 'testing', action: fn () => Inertia::render(component: 'Testing'));

// Route::get('dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::controller(DashboardController::class)->group(function () {
    Route::get('dashboard', 'index')->name('dashboard');
});

Route::controller(PaymentController::class)->group(function () {
    Route::get('payments', 'index')->name('payments.index');
    Route::get('payments/create', 'create')->name('payments.create');
    Route::post('payments/create', 'store')->name('payments.store');
    Route::get('payments/{payment}/edit', 'edit')->name('payments.edit');
    Route::put('payments/{payment}/edit', 'update')->name('payments.update');
    Route::delete('payments/{payment}/destroy', 'destroy')->name('payments.destroy');
});

Route::controller(GoalController::class)->group(function () {
    Route::get('goals', 'index')->name('goals.index');
    Route::get('goals/create', 'create')->name('goals.create');
    Route::post('goals/create', 'store')->name('goals.store');
    Route::get('goals/{goal}/edit', 'edit')->name('goals.edit');
    Route::put('goals/{goal}/edit', 'update')->name('goals.update');
    Route::delete('goals/{goal}/destroy', 'destroy')->name('goals.destroy');
});

Route::controller(BalanceController::class)->group(function () {
    Route::get('goals/{goal}/balances', 'index')->name('balances.index');
    Route::get('goals/{goal}/balances/create', 'create')->name('balances.create');
    Route::post('goals/{goal}/balances/create', 'store')->name('balances.store');
    Route::delete('goals/{goal}/balances/{balance}/destroy', 'destroy')->name('balances.destroy');
});

Route::controller(BudgetController::class)->group(function () {
    Route::get('budgets', 'index')->name('budgets.index');
    Route::get('budgets/create', 'create')->name('budgets.create');
    Route::post('budgets/create', 'store')->name('budgets.store');
    Route::get('budgets/{budget}/edit', 'edit')->name('budgets.edit');
    Route::put('budgets/{budget}/edit', 'update')->name('budgets.update');
    Route::delete('budgets/{budget}/destroy', 'destroy')->name('budgets.destroy');
});

Route::controller(IncomeController::class)->group(function () {
    Route::get('incomes', 'index')->name('incomes.index');
    Route::get('incomes/create', 'create')->name('incomes.create');
    Route::post('incomes/create', 'store')->name('incomes.store');
    Route::get('incomes/{income}/edit', 'edit')->name('incomes.edit');
    Route::put('incomes/{income}/edit', 'update')->name('incomes.update');
    Route::delete('incomes/{income}/destroy', 'destroy')->name('incomes.destroy');
});

Route::controller(ExpenseController::class)->group(function () {
    Route::get('expenses', 'index')->name('expenses.index');
    Route::get('expenses/create', 'create')->name('expenses.create');
    Route::post('expenses/create', 'store')->name('expenses.store');
    Route::get('expenses/{expense}/edit', 'edit')->name('expenses.edit');
    Route::put('expenses/{expense}/edit', 'update')->name('expenses.update');
    Route::delete('expenses/{expense}/destroy', 'destroy')->name('expenses.destroy');
});

Route::controller(NetWorthController::class)->group(function () {
    Route::get('net-worths', 'index')->name('net-worths.index');
    Route::get('net-worths/create', 'create')->name('net-worths.create');
    Route::post('net-worths/create', 'store')->name('net-worths.store');
    Route::get('net-worths/{netWorth}/detail', 'show')->name('net-worths.show');
    Route::get('net-worths/{netWorth}/edit', 'edit')->name('net-worths.edit');
    Route::put('net-worths/{netWorth}/edit', 'update')->name('net-worths.update');
    Route::delete('net-worths/{netWorth}/destroy', 'destroy')->name('net-worths.destroy');
});

Route::controller(AssetController::class)->group(function () {
    Route::get('net-worths/{netWorth}/assets', 'index')->name('assets.index');
    Route::get('net-worths/{netWorth}/assets/create', 'create')->name('assets.create');
    Route::post('net-worths/{netWorth}/assets/create', 'store')->name('assets.store');
    Route::get('net-worths/{netWorth}/assets/{asset}/edit', 'edit')->name('assets.edit');
    Route::put('net-worths/{netWorth}/assets/{asset}/edit', 'update')->name('assets.update');
    Route::delete('net-worths/{netWorth}/assets/{asset}/destroy', 'destroy')->name('assets.destroy');
});

Route::post('net-worths/{netWorth}/assets/{asset}/net-worth-assets', NetWorthAssetController::class)->name('net-worth-asset');

Route::controller(LiabilityController::class)->group(function () {
    Route::get('net-worths/{netWorth}/liabilities', 'index')->name('liabilities.index');
    Route::get('net-worths/{netWorth}/liabilities/create', 'create')->name('liabilities.create');
    Route::post('net-worths/{netWorth}/liabilities/create', 'store')->name('liabilities.store');
    Route::get('net-worths/{netWorth}/liabilities/{liability}/edit', 'edit')->name('liabilities.edit');
    Route::put('net-worths/{netWorth}/liabilities/{liability}/edit', 'update')->name('liabilities.update');
    // Route::delete('net-worths/{netWorth}/liabilities/{liability}/destroy', 'destroy')->name('liabilities.destroy');
    Route::delete('net-worths/{netWorth}/liabilities/{liability}', 'destroy')->name('liabilities.destroy');
});

Route::post('net-worths/{netWorth}/liabilities/{asset}/net-worth-liability', NetWorthLiabilityController::class)->name('net-worth-liability');

Route::middleware('auth')->group(function () {
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render("Admin/Dashboard");
        });

        Route::get('/profile', [UserController::class, 'showProfile'])->name('profile.index');
        Route::middleware(['role:super-admin'])->group(function () {
            Route::resource("/user", UserController::class);
        });
    });
    Route::get('/dashboardddd', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

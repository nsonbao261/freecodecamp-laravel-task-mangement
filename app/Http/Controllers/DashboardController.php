<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;

class DashboardController extends Controller
{
    //
    public function index() {
        $user = auth()->user();
        $totalPendingTask = Task::query()->where('status', "pending")->count();
        $myPendingTask = Task::query()->where("assigned_user_id", $user->id)->where("status","pending")->count();
        $totalProgressTask = Task::query()->where('status', "in_progress")->count();
        $myProgressTask = Task::query()->where("assigned_user_id", $user->id)->where("status","in_progress")->count();
        $totalCompletedTask = Task::query()->where('status', "completed")->count();
        $myCompletedTask = Task::query()->where("assigned_user_id", $user->id)->where("status","completed")->count();
        $myCurrentTasks = Task::query()->where('assigned_user_id', $user->id)->whereIn('status', ['pending', 'in_progress'])->get();
        $currentTasks = TaskResource::collection($myCurrentTasks);
        return inertia('Dashboard', compact(
            'myPendingTask',
            'totalPendingTask',
            'myProgressTask',
            'totalProgressTask',
            'myCompletedTask',
            'totalCompletedTask',
            'currentTasks',
        ));
    }
}

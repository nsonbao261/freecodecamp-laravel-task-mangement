<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $query = Task::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');
        
        if(request('name')) {
            $query->where("name", "like", "%".request('name')."%");
        }
        if(request('status')) {
            $query->where("status", request('status'));
        }
        if(request('priority')) {
            $query->where("priority", request('priority'));
        }


        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]);
    }
    public function myTasks()
    {
        //

        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');
        
        if(request('name')) {
            $query->where("name", "like", "%".request('name')."%");
        }
        if(request('status')) {
            $query->where("status", request('status'));
        }
        if(request('priority')) {
            $query->where("priority", request('priority'));
        }


        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy("name", "asc")->get();
        $users = User::query()->orderBy("name", "desc")->get();
        return inertia("Task/Create", [
            "projects" => ProjectResource::collection($projects),
            "users" => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
        $data  = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $task = Task::create($data);
        return to_route("task.index")->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
        return inertia("Task/Show", [
            "task" => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
        $project = Project::query()->orderBy("name", "asc")->get();
        $user = User::query()->orderBy("name", "asc")->get();
        return inertia("Task/Edit", [
            "task" => new TaskResource($task),
            "projects" => ProjectResource::collection($project),
            "users" => ProjectResource::collection($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
        $data = $request->validated();
        $task->update($data);
        return to_route("task.index")->with("success", "Task was succesfully updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
        $task->delete();
        return to_route("task.index")->with("success", "Task was successfully deleted");
    }
}

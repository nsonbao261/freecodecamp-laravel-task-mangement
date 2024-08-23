import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Edit({ auth, task, users, projects }) {
    const { data, setData, put, errors, reset } = useForm({
        name: task.name || "",
        image: "",
        status: task.status || "",
        description: task.description || "",
        priority: task.priority || "",
        due_date: task.due_date || "",
        assigned_user_id: task.assignedUser.id,
        project_id: task.project.id
    });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route("task.update", task.id))
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between text-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Update Task {task.name}
                    </h2>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                                onSubmit={onSubmit}
                            >
                                {task.image_path && (
                                    <div className="w-64 mb-2">
                                        <img src={task.image_path} alt="" />
                                    </div>
                                )}
                                <div>
                                    <InputLabel
                                        htmlFor="task_image_path"
                                        value="Image Path"
                                    />
                                    <TextInput
                                        id="task_image_path"
                                        name="image"
                                        type="file"
                                        value={data.image}
                                        className="block mt-1 w-full"
                                        onChange={(e) =>
                                            setData("image", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.image}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_name"
                                        value="Task Name"
                                    />
                                    <TextInput
                                        id="task_name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        isFocused={true}
                                        className="block mt-1 w-full"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_description"
                                        value="Task Description"
                                    />
                                    <TextAreaInput
                                        id="task_description"
                                        name="description"
                                        value={data.description}
                                        className="block mt-1 w-full"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_due_date"
                                        value="Task Due Date"
                                    />
                                    <TextInput
                                        id="task_due_date"
                                        name="due_date"
                                        type="date"
                                        value={data.due_date}
                                        className="block mt-1 w-full"
                                        onChange={(e) =>
                                            setData("due_date", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.due_date}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_status"
                                        value="Task Status"
                                    />
                                    <SelectInput
                                        id="task_status"
                                        name="status"
                                        value = {data.status}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.status}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_priority"
                                        value="Task Priority"
                                    />
                                    <SelectInput
                                        id="task_priority"
                                        name="priority"
                                        value = {data.priority}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("priority", e.target.value)
                                        }
                                    >
                                        <option value="low">Low</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.priority}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_assigned_user"
                                        value="Task Assigned User"
                                    />
                                    <SelectInput
                                        id="task_assigned_user"
                                        name="assigned_user_id"
                                        value = {data.assigned_user_id}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("assigned_user_id", e.target.value)
                                        }
                                    >
                                        {users.data.map((user) => (
                                            <option value={user.id}>{user.name}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.assigned_user_id}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_project_id"
                                        value="Task Project Id"
                                    />
                                    <SelectInput
                                        id="task_project_id"
                                        name="project_id"
                                        value = {data.project_id}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("project_id", e.target.value)
                                        }
                                    >
                                        {projects.data.map((project) => (
                                            <option value={project.id}>{project.name}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.project_id}
                                    />
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("task.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-700 hover:bg-gray-200 transition-all rounded shadow mr-2"
                                    >
                                        Cancle
                                    </Link>
                                    <button className="bg-emerald-500 py-1 px-3 hover:bg-emerald-600 text-white rounded shadow transition-all">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

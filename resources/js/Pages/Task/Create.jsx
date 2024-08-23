import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Create({ auth, projects, users }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        image: "",
        status: "",
        description: "",
        due_date: "",
        priority: "",
        assigned_user_id: "",
        project_id: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("task.store"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between text-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Tasks Create
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
                                <div>
                                    <InputLabel htmlFor="task_image_path" value="Image Path"/>
                                    <TextInput
                                    id="task_image_path"
                                    name='image'
                                    type="file"
                                    value={data.image}
                                    className="block mt-1 w-full"
                                    onChange={(e) => setData('image', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.image} />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_name" value="Task Name"/>
                                    <TextInput
                                    id="task_name"
                                    name='name'
                                    type="text"
                                    value={data.name}
                                    isFocused = {true}
                                    className="block mt-1 w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_description" value="Task Description"/>
                                    <TextAreaInput
                                    id="task_description"
                                    name='description'
                                    value={data.description}
                                    className="block mt-1 w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_due_date" value="Task Due Date"/>
                                    <TextInput
                                    id="task_due_date"
                                    name='due_date'
                                    type='date'
                                    value={data.due_date}
                                    className="block mt-1 w-full"
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.due_date} />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="task_status" value="Task Status"/>
                                    <SelectInput
                                    id="task_status"
                                    name="status"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('status', e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError className="mt-2" message={errors.status} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_priority" value="Task Priority"/>
                                    <SelectInput
                                    id="task_priority"
                                    name="priority"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('priority', e.target.value)}>
                                        <option value="">Select Priority</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </SelectInput>
                                    <InputError className="mt-2" message={errors.priority} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_assigned_user" value="Assigned User"/>
                                    <SelectInput
                                    id="task_assigned_user"
                                    name="assigned_user_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('assigned_user_id', e.target.value)}>
                                        <option value="">Select Assigned User</option>
                                        {
                                            users.data.map((user) => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    <InputError className="mt-2" message={errors.assigned_user_id} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_project" value="Project"/>
                                    <SelectInput
                                    id="task_project"
                                    name="project_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('project_id', e.target.value)}>
                                        <option value="">Select Project</option>
                                        {
                                            projects.data.map((project) => (
                                                <option key={project.id} value={project.id}>{project.name}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    <InputError className="mt-2" message={errors.project_id} />
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                    href={route('task.index')}
                                    className="bg-gray-100 py-1 px-3 text-gray-700 hover:bg-gray-200 transition-all rounded shadow mr-2">
                                        Cancle
                                    </Link>
                                    <button className="bg-emerald-500 py-1 px-3 hover:bg-emerald-600 text-white rounded shadow transition-all">
                                        Submit
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

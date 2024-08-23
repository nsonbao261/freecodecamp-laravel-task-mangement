import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    TASK_STATUS_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_PRIORITY_CLASS_MAP,
} from "@/constants.jsx";

export default function Show({ task, auth, }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {"task: " + task.name}
                </h2>
            }
        >
            <Head title={"task: " + task.name} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div>
                                <img
                                    src={task.image_path}
                                    alt=""
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            task ID
                                        </label>
                                        <p className="mt-1">{task.id}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            task Name
                                        </label>
                                        <p className="mt-1">{task.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            task Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white " +
                                                    TASK_STATUS_CLASS_MAP[
                                                        task.status
                                                    ]
                                                }
                                            >
                                                {
                                                    TASK_STATUS_TEXT_MAP[
                                                        task.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Priority
                                        </label>
                                        <p className="mt-1">
                                            <span className={
                                                "px-2 py-1 text-white rounded "
                                                + TASK_PRIORITY_CLASS_MAP[task.priority]
                                            }>
                                                {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                            </span>
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Created By
                                        </label>
                                        <p className="mt-1">
                                            {task.createdBy.name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Created Date
                                        </label>
                                        <p className="mt-1">{task.created_at}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Due Date
                                        </label>
                                        <p className="mt-1">{task.due_date}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Updated By
                                        </label>
                                        <p className="mt-1">{task.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Project Name
                                        </label>
                                        <p className="mt-1">
                                            <Link className="text-white rounded hover:underline"
                                            href={route("project.show", task.project.id)}>
                                                {task.project.name}
                                            </Link>
                                        </p>
                            </div>
                            <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Description
                                        </label>
                                        <p className="mt-1">{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

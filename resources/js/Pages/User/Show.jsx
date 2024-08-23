import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ user, auth, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {"User: " + user.name}
                </h2>
            }
        >
            <Head title={"User: " + user.name} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-1 mt-2">
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            User ID
                                        </label>
                                        <p className="mt-1">{user.id}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            User Name
                                        </label>
                                        <p className="mt-1">{user.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            User Email
                                        </label>
                                        <p className="mt-1">{user.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Created Date
                                        </label>
                                        <p className="mt-1">{user.created_at}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

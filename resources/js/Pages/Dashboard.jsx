import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    auth,
    myPendingTask,
    totalPendingTask,
    myProgressTask,
    totalProgressTask,
    myCompletedTask,
    totalCompletedTask,
    currentTasks
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-amber-500 font-semibold text-xl">
                                My Pending Task
                            </h3>
                            <span className="mr-2">{myPendingTask}</span>/
                            <span className="ml-2">{totalPendingTask}</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-blue-500 font-semibold text-xl">
                                My Progress Task
                            </h3>
                            <span className="mr-2">{myProgressTask}</span>/
                            <span className="ml-2">{totalProgressTask}</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-green-500 font-semibold text-xl">
                                My Completed Task
                            </h3>
                            <span className="mr-2">{myCompletedTask}</span>/
                            <span className="ml-2">{totalCompletedTask}</span>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs bg-gray-50 dark:bg-gray-500 uppercase text-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap">
                                <th className="px-2 py-3">ID</th>
                                <th className="px-2 py-3">Name</th>
                                <th className="px-2 py-3">Project Name</th>
                                <th className="px-2 py-3">Status</th>
                                <th className="px-2 py-3">Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentTasks.data.map((task)=> (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th className="px-2 py-3">{task.id}</th>
                                        <th className="px-2 py-3">{task.name}</th>
                                        <th className="px-2 py-3">{task.project.name}</th>
                                        <th className={
                                            "px-2 py-3 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]
                                        }>{
                                            TASK_STATUS_TEXT_MAP[task.status]
                                        }</th>
                                        <th className={
                                            "px-2 py-3 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority]
                                        }>{
                                            TASK_PRIORITY_TEXT_MAP[task.priority]
                                        }</th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

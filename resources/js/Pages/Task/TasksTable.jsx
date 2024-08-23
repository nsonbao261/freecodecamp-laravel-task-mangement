import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import {
    TASK_STATUS_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
} from "@/constants.jsx";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";


export default function TasksTable({tasks, queryParams, control = "task.index" ,hideProject = false}) {

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route(control), queryParams);
    };

    const onKeyPress = (name, event) => {
        if (event.key !== "Enter") return;
        searchFieldChanged(name, event.target.value);
    };

    const sortChanged = (name) => {
        if (queryParams["sort_field"] === name) {
            queryParams["sort_direction"] =
                queryParams["sort_direction"] === "asc" ? "desc" : "asc";
        } else {
            queryParams["sort_field"] = name;
            queryParams["sort_direction"] = "desc";
        }

        router.get(route(control), queryParams);
    };

    const deleteTask = (task)  => {
        if(!window.confirm("Are you sure to delete this task")) {
            return;
        } else {
            router.delete(route("task.destroy", task.id));
        }
    }
    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sort_field={queryParams["sort_field"]}
                                sort_direction={queryParams["sort_direction"]}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <TableHeading sortable={false}>Image</TableHeading>
                            <TableHeading
                                name="name"
                                sort_field={queryParams["sort_field"]}
                                sort_direction={queryParams["sort_direction"]}
                                sortChanged={sortChanged}
                            >
                                Name
                            </TableHeading>
                            {
                                !hideProject && (
                                <TableHeading sortable={false}>
                                    Project Name
                                </TableHeading>
                                )
                            }
                            <TableHeading sortable={false}>Status</TableHeading>
                            <TableHeading sortable={false}>Priority</TableHeading>
                            <TableHeading
                                name="created_at"
                                sort_field={queryParams["sort_field"]}
                                sort_direction={queryParams["sort_direction"]}
                                sortChanged={sortChanged}
                            >
                                Created Date
                            </TableHeading>
                            <TableHeading
                                name="due_date"
                                sort_field={queryParams["sort_field"]}
                                sort_direction={queryParams["sort_direction"]}
                                sortChanged={sortChanged}
                            >
                                Due Date
                            </TableHeading>
                            <TableHeading sortable={false}>
                                Created By
                            </TableHeading>
                            <TableHeading sortable={false}>
                                Actions
                            </TableHeading>
                        </tr>
                    </thead>

                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-2 py-3"></th>
                            <th className="px-2 py-3"></th>
                            <th className="px-2 py-3">
                                <TextInput
                                    className="w-full"
                                    placeholder="Task Name"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </th>
                            {
                                !hideProject && (
                                    <th className="px-2 py-3"></th>
                                )
                            }
                            <th className="px-2 py-3">
                                <SelectInput
                                    className="w-full"
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="in_progress">
                                        In Progess
                                    </option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                </SelectInput>
                            </th>
                            <th className="px-2 py-3">
                                <SelectInput
                                    className="w-full"
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "priority",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Priority</option>
                                    <option value="low">
                                        Low
                                    </option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </SelectInput>
                            </th>
                            <th className="px-2 py-3"></th>
                            <th className="px-2 py-3"></th>
                            <th className="px-2 py-3"></th>
                            <th className="px-2 py-3 text-center"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks.data.map((task) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={task.id}
                            >
                                <td className="px-3 py-2">{task.id}</td>
                                <td className="px-3 py-2">
                                    <img
                                        src={task.image_path}
                                        alt=""
                                        style={{ width: 60 }}
                                    />
                                </td>
                                <td className="px-3 py-2 text-white hover:underline">
                                    <Link href={route("task.show", task.id)}>
                                    {task.name}
                                    </Link>
                                </td>
                                {
                                    !hideProject && (
                                        <td className="px-3 py-2">{task.project.name}</td>
                                    )
                                }
                                <td className="px-3 py-2">
                                    <span
                                        className={
                                            "px-2 py-1 rounded text-white " +
                                            TASK_STATUS_CLASS_MAP[task.status]
                                        }
                                    >
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-3 py-2">
                                    <span
                                        className={
                                            "px-2 py-1 rounded text-white " +
                                            TASK_PRIORITY_CLASS_MAP[task.priority]
                                        }
                                    >
                                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                    </span>
                                </td>
                                <td className="px-3 py-2">{task.created_at}</td>
                                <td className="px-3 py-2">{task.due_date}</td>
                                <td className="px-3 py-2">
                                    {task.createdBy.name}
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link
                                        href={route("task.edit", task.id)}
                                        className="fort-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="fort-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                        onClick={(e) => deleteTask(task)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination Links={tasks.meta.links} />
        </>
    );
}

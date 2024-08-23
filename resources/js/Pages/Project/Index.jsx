import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import {
    PROJECT_STATUS_TEXT_MAP,
    PROJECT_STATUS_CLASS_MAP,
} from "@/constants.jsx";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("project.index"), queryParams);
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

        router.get(route("project.index"), queryParams);
    };

    const destroyProject = (project) => {
        if (!window.confirm("Are you sure you want to destroy project ")) {
            return
        }
        router.delete(route("project.destroy", project.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between text-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Projects
                    </h2>
                    <Link href = {route('project.create')}
                    className="bg-emerald-500 px-2 py-1 text-white hover:bg-emerald-600 rounded shadow transition-all">
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />

            {success && (
                <div className="px-2 py-4 bg-emerald-500 text-white rounded mb-2">
                    {success}
                </div>
            )}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={
                                                    queryParams["sort_field"]
                                                }
                                                sort_direction={
                                                    queryParams[
                                                        "sort_direction"
                                                    ]
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>
                                            <TableHeading sortable={false}>
                                                Image
                                            </TableHeading>
                                            <TableHeading
                                                name="name"
                                                sort_field={
                                                    queryParams["sort_field"]
                                                }
                                                sort_direction={
                                                    queryParams[
                                                        "sort_direction"
                                                    ]
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>
                                            <TableHeading sortable={false}>
                                                Status
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={
                                                    queryParams["sort_field"]
                                                }
                                                sort_direction={
                                                    queryParams[
                                                        "sort_direction"
                                                    ]
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Created Date
                                            </TableHeading>
                                            <TableHeading
                                                name="due_date"
                                                sort_field={
                                                    queryParams["sort_field"]
                                                }
                                                sort_direction={
                                                    queryParams[
                                                        "sort_direction"
                                                    ]
                                                }
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
                                                    placeholder="Project Name"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("name", e)
                                                    }
                                                />
                                            </th>
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
                                                    <option value="">
                                                        Select Status
                                                    </option>
                                                    <option value="in_progress">
                                                        In Progess
                                                    </option>
                                                    <option value="completed">
                                                        Completed
                                                    </option>
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-2 py-3"></th>
                                            <th className="px-2 py-3"></th>
                                            <th className="px-2 py-3"></th>
                                            <th className="px-2 py-3 text-center"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={project.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {project.id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <img
                                                        src={project.image_path}
                                                        alt=""
                                                        style={{ width: 60 }}
                                                    />
                                                </td>
                                                <td className="px-3 py-2 text-white hover:underline">
                                                    <Link
                                                        href={route(
                                                            "project.show",
                                                            project.id
                                                        )}
                                                    >
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            PROJECT_STATUS_CLASS_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            PROJECT_STATUS_TEXT_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.created_at}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.due_date}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {project.createdBy.name}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <Link
                                                        href={route(
                                                            "project.edit",
                                                            project.id
                                                        )}
                                                        className="fort-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        onClick={(e)=> destroyProject(project)}
                                                        className="fort-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination Links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

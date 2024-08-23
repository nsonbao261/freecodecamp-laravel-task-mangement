import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Edit({ auth, project }) {
    const { data, setData, put, errors, reset } = useForm({
        name: project.name || "",
        image: "",
        status: project.status || "",
        description: project.description || "",
        due_date: project.due_date || "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route("project.update", project.id))
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between text-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Update Project {project.name}
                    </h2>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                                onSubmit={onSubmit}
                            >
                                {project.image_path && (
                                    <div className="w-64 mb-2">
                                        <img src={project.image_path} alt="" />
                                    </div>
                                )}
                                <div>
                                    <InputLabel
                                        htmlFor="project_image_path"
                                        value="Image Path"
                                    />
                                    <TextInput
                                        id="project_image_path"
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
                                        htmlFor="project_name"
                                        value="Project Name"
                                    />
                                    <TextInput
                                        id="project_name"
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
                                        htmlFor="project_description"
                                        value="Project Description"
                                    />
                                    <TextAreaInput
                                        id="project_description"
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
                                        htmlFor="project_due_date"
                                        value="Project Due Date"
                                    />
                                    <TextInput
                                        id="project_due_date"
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
                                        htmlFor="project_due_date"
                                        value="Project Due Date"
                                    />
                                    <SelectInput
                                        id="project_status"
                                        name="status"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="pending">Pending</option>
                                        t
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        t
                                        <option value="completed">
                                            Completed
                                        </option>
                                        t
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.due_date}
                                    />
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("project.index")}
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

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Edit({ auth, user }) {
    const { data, setData, put, errors, reset } = useForm({
        name: user.name || "",
        email: user.email || "",
        password:"",
        password_confirmation: ""
    });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route("user.update", user.id))
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between text-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Update User {user.name}
                    </h2>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                                onSubmit={onSubmit}
                            >

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_name"
                                        value="User Name"
                                    />
                                    <TextInput
                                        id="user_name"
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
                                        htmlFor="user_email"
                                        value="User Email"
                                    />
                                    <TextInput
                                        id="user_email"
                                        name="email"
                                        type="text"
                                        value={data.email}
                                        className="block mt-1 w-full"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_password"
                                        value="User Password"
                                    />
                                    <TextInput
                                        id="user_password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        className="block mt-1 w-full"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.password}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_password_confirmation"
                                        value="User Password"
                                    />
                                    <TextInput
                                        id="user_password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        className="block mt-1 w-full"
                                        onChange={(e) =>
                                            setData("password_confirmation", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("user.index")}
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

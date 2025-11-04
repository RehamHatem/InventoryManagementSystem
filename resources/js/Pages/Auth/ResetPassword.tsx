import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () =>
                reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-blue-600" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-gray-900">
                    Reset Your Password
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Enter your new password below
                </p>

                <form onSubmit={submit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email Address" />
                        <div className="relative mt-2">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full border border-gray-300 rounded-md px-4 py-3 pl-10 
                                           bg-gray-100 text-gray-700 cursor-not-allowed"
                                readOnly
                            />
                        </div>
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="New Password" />

                        <div className="relative mt-2">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                placeholder="Enter new password"
                                className="block w-full border border-gray-300 rounded-md px-4 py-3 pl-10 pr-10 bg-white 
                                           focus:border-blue-500 focus:ring-blue-500"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                autoComplete="new-password"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm New Password"
                        />

                        <div className="relative mt-2">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                            <input
                                id="password_confirmation"
                                type={showConfirmPassword ? "text" : "password"}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="Confirm new password"
                                className="block w-full border border-gray-300 rounded-md px-4 py-3 pl-10 pr-10 bg-white 
                                           focus:border-blue-500 focus:ring-blue-500"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                autoComplete="new-password"
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-3 text-gray-500"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-1"
                        />
                    </div>

                    {/* Button */}
                    <button
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
                    >
                        {processing ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}

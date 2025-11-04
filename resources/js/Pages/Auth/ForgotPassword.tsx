import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Mail } from "lucide-react";

export default function ForgotPassword({ status ,auth}: { status?: string , auth: any }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout auth={auth}>
            <Head title="Forgot Password" />

            <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-gray-900">
                    Forgot Your Password?
                </h2>

                {/* Subtitle */}
                <p className="text-center text-gray-500 mb-6">
                    Enter your email to receive a password reset link
                </p>

                {/* Status message */}
                {status && (
                    <div className="mb-4 rounded-md bg-green-100 px-4 py-2 text-sm text-green-700">
                        {status}
                    </div>
                )}

                {/* Form */}
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
                                onChange={(e) => setData("email", e.target.value)}
                                placeholder="you@example.com"
                                className="block w-full border border-gray-300 rounded-md px-4 py-3 pl-10 bg-white 
                                           focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Submit button */}
                    <button
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
                    >
                        {processing ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}

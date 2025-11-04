import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { MailCheck } from "lucide-react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout auth={null}>
            <Head title="Email Verification" />

            <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md">

                {/* Header Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
                        <MailCheck className="h-8 w-8 text-blue-600" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-gray-900">
                    Verify Your Email
                </h2>

                {/* Subtitle */}
                <p className="text-center text-gray-500 mb-6 mt-2">
                    Before continuing, please check your email for a verification link.
                    If you didn’t receive the email, we can send another.
                </p>

                {/* Notification */}
                {status === "verification-link-sent" && (
                    <div className="mb-4 rounded-md bg-green-100 px-4 py-2 text-sm text-green-700">
                        A new verification link has been sent to your email address.
                    </div>
                )}

                {/* Actions */}
                <form onSubmit={submit} className="space-y-5">

                    {/* Resend Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
                    >
                        {processing ? "Sending..." : "Resend Verification Email"}
                    </button>

                    {/* Logout */}
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="mt-2 w-full text-center text-gray-600 hover:underline text-sm"
                    >
                        Log Out
                    </Link>
                </form>
            </div>
        </GuestLayout>
    );
}

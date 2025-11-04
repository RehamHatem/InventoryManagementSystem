import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Welcome back!
                </h2>

                <p className="text-gray-600">
                    Here is an overview of your inventory activity.
                </p>
            </div>
        </DashboardLayout>
    );
}

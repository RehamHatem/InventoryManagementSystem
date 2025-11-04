import React, { useEffect } from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Edit({ supplier }: { supplier: any }) {
    const { flash } = usePage().props as any;

    const { data, setData, put, processing, errors } = useForm({
        name: supplier.name || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("suppliers.update", supplier.id), {
            onSuccess: () => {
                toast.success("Supplier updated successfully!");
            },
            onError: (errors) => {
                Object.values(errors).forEach((err: any) => toast.error(err as string));
            },
        });
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full min-h-screen p-3"
            >
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-gray-500 mb-4"
                >
                    <Link href={route("suppliers.index")} className="hover:underline">
                        Suppliers
                    </Link>{" "}
                    / <span className="text-gray-700">Edit Supplier</span>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-semibold text-gray-800 mb-1">
                        Edit Supplier
                    </h1>
                    <p className="text-gray-500">
                        Update the details of this supplier below.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8 w-full"
                >
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">
                        Supplier Information
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6 w-full">
                        {/* Supplier Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="w-full"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Supplier Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                                placeholder="Enter supplier’s name"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                            )}
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="w-full"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                required
                                placeholder="contact@supplier.com"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                            )}
                        </motion.div>

                        {/* Phone */}
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="w-full"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                                required
                                placeholder="(123) 456-7890"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.phone && (
                                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                            )}
                        </motion.div>

                        {/* Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="w-full"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <textarea
                                value={data.address}
                                onChange={(e) => setData("address", e.target.value)}
                                required
                                placeholder="123 Supplier St, Business City"
                                rows={4}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.address && (
                                <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                            )}
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 }}
                            className="flex justify-end items-center gap-4 pt-6 border-t border-gray-100 mt-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                type="button"
                                onClick={() => (window.location.href = route("suppliers.index"))}
                                className="inline-flex items-center justify-center px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
                            >
                                Cancel
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
                            >
                                {processing ? "Updating..." : "Update Supplier"}
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </DashboardLayout>
    );
}

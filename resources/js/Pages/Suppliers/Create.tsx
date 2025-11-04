import React, { useEffect } from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Create() {
    const { flash } = usePage().props as any;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("suppliers.store"), {
            onSuccess: () => {
                toast.success("Supplier created successfully!");
                reset();
            },
            onError: (errors) => {
                Object.values(errors).forEach((err: any) => toast.error(err as string));
            },
        });
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-gray-500 mb-4"
                >
                    <Link href={route("suppliers.index")} className="hover:underline">
                        Suppliers
                    </Link>{" "}
                    / <span className="text-gray-700">Create New</span>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-semibold text-gray-800 mb-1">
                        Create New Supplier
                    </h1>
                    <p className="text-gray-500">
                        Fill in the details below to add a new supplier to the system.
                    </p>
                </motion.div>

                {/* Full Width Form Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8 w-full"
                >
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="text-xl font-semibold mb-6 text-gray-800"
                    >
                        Supplier Information
                    </motion.h2>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                        className="space-y-6 w-full"
                    >
                        {/* Supplier Name */}
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Supplier Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Enter supplier’s legal name"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                            )}
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                placeholder="contact@supplier.com"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                            )}
                        </motion.div>

                        {/* Phone */}
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                                placeholder="(123) 456-7890"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.phone && (
                                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                            )}
                        </motion.div>

                        {/* Address */}
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                required
                                value={data.address}
                                onChange={(e) => setData("address", e.target.value)}
                                placeholder="123 Supplier St, Business City, 12345"
                                rows={4}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.address && (
                                <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                            )}
                        </motion.div>

                        {/* Buttons */}

                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
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
                                {processing ? "Saving..." : "Save Supplier"}
                            </motion.button>
                        </motion.div>

                    </motion.form>
                </motion.div>
            </motion.div>
        </DashboardLayout>
    );
}

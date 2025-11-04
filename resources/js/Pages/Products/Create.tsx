import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Create({ suppliers = [] }: any) {
    const [form, setForm] = useState({
        name: "",
        sku: "",
        cost: "",
        price: "",
        quantity: "",
        supplier_id: "",
        status: true,
    });

    const [errors, setErrors] = useState<any>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route("products.store"), form, {
            onSuccess: () => toast.success("Product created successfully!"),
            onError: (err) => {
                setErrors(err);
                Object.values(err).forEach((e: any) => toast.error(e));
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Add Product" />

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
                    <Link href={route("products.index")} className="hover:underline">
                        Products
                    </Link>{" "}
                    / <span className="text-gray-700">Create New</span>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-semibold text-gray-800 mb-1">
                        Create New Product
                    </h1>
                    <p className="text-gray-500">
                        Fill in the details below to add a new product to the inventory.
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8 w-full"
                >
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
                        {/* Product Name */}
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g., Wireless Ergonomic Mouse"
                                required
                                className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                    errors.name ? "border-red-500" : ""
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </motion.div>

                        {/* SKU + Quantity */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    SKU (Stock Keeping Unit) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={form.sku}
                                    onChange={handleChange}
                                    required
                                    className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                        errors.sku ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.sku && (
                                    <p className="text-red-500 text-sm mt-1">{errors.sku}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Quantity on Hand <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={form.quantity}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </motion.div>

                        {/* Category + Supplier */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    disabled
                                >
                                    <option>Electronics</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Supplier <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="supplier_id"
                                    value={form.supplier_id}
                                    onChange={handleChange}
                                    required
                                    className={`block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                                        errors.supplier_id ? "border-red-500" : ""
                                    }`}
                                >
                                    <option value="">Select a supplier</option>
                                    {suppliers.map((s: any) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.supplier_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.supplier_id}</p>
                                )}
                            </div>
                        </motion.div>

                        {/* Cost + Price */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cost <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="cost"
                                    value={form.cost}
                                    onChange={handleChange}
                                    required
                                    step="0.01"
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                    step="0.01"
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </motion.div>

                        {/* Product Status */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="flex items-center space-x-2 pt-2"
                        >
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="status"
                                    checked={form.status}
                                    onChange={handleChange}
                                    className="h-5 w-10 rounded-full border-gray-300 toggle"
                                />
                                <span className="text-gray-600 text-sm">
                                    Product Status (Inactive products will not be visible to customers)
                                </span>
                            </label>
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
                                onClick={() => (window.location.href = route("products.index"))}
                                className="inline-flex items-center justify-center px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
                            >
                                Cancel
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
                            >
                                Save Product
                            </motion.button>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </motion.div>
        </DashboardLayout>
    );
}

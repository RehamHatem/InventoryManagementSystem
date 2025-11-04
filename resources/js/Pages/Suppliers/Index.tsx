import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Index({ suppliers }: { suppliers: any[] }) {
    const [search, setSearch] = useState("");
    const { delete: destroy } = useForm({});
    const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

    const filtered = suppliers.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            (s.contact_person ?? "").toLowerCase().includes(search.toLowerCase())
    );

    const handleConfirmDelete = () => {
        if (!selectedSupplier) return;
        destroy(route("suppliers.destroy", selectedSupplier.id), {
            onSuccess: () => {
                toast.success("Supplier deleted successfully!");
                setSelectedSupplier(null);
            },
            onError: () => {
                toast.error("Failed to delete supplier.");
                setSelectedSupplier(null);
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Suppliers" />

            {/* Page Animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded-xl shadow-sm"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <motion.h2
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-semibold text-gray-800"
                    >
                        Supplier Management
                    </motion.h2>

                    <motion.a
                        href={route("suppliers.create")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add New Supplier</span>
                    </motion.a>
                </div>

                {/* Search Bar */}
                <motion.input
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    type="text"
                    placeholder="Search by name or contact..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full mb-6 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {/* Table */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="overflow-x-auto"
                >
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-700">
                                <th className="px-4 py-3 border-b">Supplier Name</th>
                                <th className="px-4 py-3 border-b">Email</th>
                                <th className="px-4 py-3 border-b">Phone</th>
                                <th className="px-4 py-3 border-b">Address</th>
                                <th className="px-4 py-3 border-b text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filtered.map((s) => (
                                    <motion.tr
                                        key={s.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3 border-b font-medium text-gray-800">
                                            {s.name}
                                        </td>
                                        <td className="px-4 py-3 border-b text-gray-600">
                                            {s.email}
                                        </td>
                                        <td className="px-4 py-3 border-b text-gray-600">
                                            {s.phone}
                                        </td>
                                        <td className="px-4 py-3 border-b text-gray-600">
                                            {s.address || "-"}
                                        </td>
                                        <td className="px-4 py-3 border-b text-right flex justify-end space-x-2">
                                            {/* Edit Button */}
                                            <motion.a
                                                href={route("suppliers.edit", s.id)}
                                                whileHover={{ scale: 1.1 }}
                                                className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
                                                title="Edit"
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </motion.a>

                                            {/* Delete Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                onClick={() => setSelectedSupplier(s)}
                                                title="Delete"
                                                className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </motion.div>
            </motion.div>

            {/* Delete Confirmation Dialog */}
            <AnimatePresence>
                {selectedSupplier && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
                        >
                            <button
                                onClick={() => setSelectedSupplier(null)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Confirm Deletion
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete{" "}
                                <span className="font-medium text-gray-900">
                                    {selectedSupplier.name}
                                </span>
                                ? This action cannot be undone.
                            </p>

                            <div className="flex justify-end space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedSupplier(null)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={handleConfirmDelete}
                                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}

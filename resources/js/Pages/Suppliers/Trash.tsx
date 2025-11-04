import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, Link, RotateCcw, Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Supplier {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    deleted_at: string;
}

interface PaginatedSuppliers {
    data: Supplier[];
    links: { url: string | null; label: string; active: boolean }[];
}

export default function Trash({ suppliers }: { suppliers: PaginatedSuppliers }) {
    const [selected, setSelected] = useState<Supplier | null>(null);
    const [action, setAction] = useState<"restore" | "delete" | null>(null);

    const handleRestore = (id: number) => {
        router.post(route("suppliers.restore", id), {}, {
            onSuccess: () => toast.success("Supplier restored successfully"),
            onError: () => toast.error("Failed to restore supplier"),
        });
        setSelected(null);
    };

    const handleForceDelete = (id: number) => {
        router.delete(route("suppliers.forceDelete", id), {
            onSuccess: () => toast.success("Supplier permanently deleted"),
            onError: () => toast.error("Failed to delete supplier"),
        });
        setSelected(null);
    };

    return (
        <DashboardLayout>
            <Head title="Trashed Suppliers" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-8"
            >
                {/* Header */}
                
                <div className="flex justify-between items-center mb-6">
                    <motion.h2
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-semibold text-gray-800"
                    >
                        Trashed Suppliers
                    </motion.h2>

                    <motion.a
                        href={route("suppliers.index")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Suppliers</span>
                    </motion.a>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border bg-white rounded-xl shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-left text-gray-700">
                                <th className="px-4 py-3 border-b">Name</th>
                                <th className="px-4 py-3 border-b">Email</th>
                                <th className="px-4 py-3 border-b">Phone</th>
                                <th className="px-4 py-3 border-b">Address</th>
                                <th className="px-4 py-3 border-b">Deleted At</th>
                                <th className="px-4 py-3 border-b text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <AnimatePresence>
                                {suppliers.data.length > 0 ? (
                                    suppliers.data.map((s) => (
                                        <motion.tr
                                            key={s.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-3 border-b font-medium text-gray-800">{s.name}</td>
                                            <td className="px-4 py-3 border-b text-gray-600">{s.email}</td>
                                            <td className="px-4 py-3 border-b text-gray-600">{s.phone}</td>
                                            <td className="px-4 py-3 border-b text-gray-600">{s.address}</td>
                                            <td className="px-4 py-3 border-b text-gray-600">
                                                {new Date(s.deleted_at).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 border-b text-right space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-md"
                                                    onClick={() => { setSelected(s); setAction("restore"); }}
                                                >
                                                    <RotateCcw className="w-5 h-5" />
                                                </motion.button>

                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                                    onClick={() => { setSelected(s); setAction("delete"); }}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center text-gray-500 py-10">
                                            🗑️ No trashed suppliers found.
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {suppliers.data.length > 0 && suppliers.links.length > 3 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {suppliers.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Confirmation Dialog */}
            <AnimatePresence>
                {selected && (
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
                                onClick={() => setSelected(null)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {action === "restore" ? "Confirm Restore" : "Confirm Deletion"}
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to{" "}
                                {action === "restore" ? (
                                    <>restore <span className="font-medium text-gray-900">{selected.name}</span>?</>
                                ) : (
                                    <>permanently delete <span className="font-medium text-gray-900">{selected.name}</span>? This action cannot be undone.</>
                                )}
                            </p>

                            <div className="flex justify-end space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelected(null)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </motion.button>
                                {action === "restore" ? (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => handleRestore(selected.id)}
                                        className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                    >
                                        Restore
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => handleForceDelete(selected.id)}
                                        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        Delete Permanently
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}

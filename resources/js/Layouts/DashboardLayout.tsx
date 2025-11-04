import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";
import {
    LayoutDashboard,
    Package,
    Users,
    ChevronDown,
    LogOut,
    User,
    Boxes,
} from "lucide-react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* SIDEBAR */}
            <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
                {/* Top */}
                <div>
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-3 px-6 py-6 border-b hover:bg-gray-50"
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                            <Boxes className="h-14 w-14 text-blue-600" />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            Inventory Manager
                        </h1>
                    </Link>

                    {/* Navigation */}
                    <nav className="mt-6 space-y-1 px-2">
                        <SidebarLink href="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
                        <SidebarLink href="/products" icon={<Package />} label="Products" />
                        <SidebarLink href="/suppliers" icon={<Users />} label="Suppliers" />
                    </nav>
                </div>

                {/* USER DROPDOWN */}
                <div className="p-4 border-t">
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="w-full flex items-center justify-between px-3 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-700">
                                {auth.user.name}
                            </span>
                        </div>
                        <ChevronDown
                            className={`h-5 w-5 text-gray-600 transition ${openMenu ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {openMenu && (
                        <div className="mt-2 bg-white shadow rounded-lg overflow-hidden">
                            <Link
                                href={route("profile.edit")}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </Link>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Log out</span>
                            </Link>
                        </div>
                    )}
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}

function SidebarLink({
    href,
    icon,
    label,
}: {
    href: string;
    icon: any;
    label: string;
}) {
    const page = usePage();
    const active = page.url.startsWith(href);

    return (
        <Link
            href={href}
            className={`flex items-center space-x-3 p-3 rounded-lg transition hover:bg-blue-50 ${active ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                }`}
        >
            <span className="w-5 h-5">{icon}</span>
            <span>{label}</span>
        </Link>
    );
}

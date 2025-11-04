import Navbar from "@/Components/navbar";

export default function GuestLayout({ children, auth }: { children: React.ReactNode; auth: any }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar auth={auth} />
            <div className="flex items-center justify-center p-6">
                {children}
            </div>
        </div>
    );
}

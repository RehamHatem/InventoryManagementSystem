export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            {children}
        </div>
    );
}

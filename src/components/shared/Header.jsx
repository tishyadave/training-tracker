import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button'; // Adjust based on your button export (default vs named)

export default function Header() {
    // Pulling the logout function from your existing AuthContext
    const { logout } = useAuth();

    return (
        <header className="flex items-center h-16 px-6 bg-white border-b shrink-0">

            {/* Leftmost: Company Logo */}
            <div className="flex-1 flex justify-start">
                {/* Replace with your actual logo path from the public folder */}
                <img
                    src="/logo.png"
                    alt="Company Logo"
                    className="h-8 w-auto"
                />
            </div>

            {/* Middle: App Title */}
            <div className="flex-1 flex justify-center">
                <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
                    Training Tracker
                </h1>
            </div>

            {/* Rightmost: Logout Button */}
            <div className="flex-1 flex justify-end">
                <Button
                    variant="outline"
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-900"
                >
                    Logout
                </Button>
            </div>

        </header>
    );
}
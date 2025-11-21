import { Bell, LogOut, User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-end">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between">
      <div className="flex-1"></div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">
              {user?.fullName || user?.username}
            </p>
            <p className="text-gray-500">{user?.roles}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 hover:text-red-600"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

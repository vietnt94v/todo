import { Link, useLocation } from "react-router-dom";
import { Home, Users, Settings, Package } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/ums", icon: Users, label: "User Management" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Package className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold">WMS</span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-gray-800">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}

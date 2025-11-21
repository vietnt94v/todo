import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

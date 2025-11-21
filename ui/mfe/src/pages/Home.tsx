import { useAppSelector } from '../store/hooks';
import { Home as HomeIcon, Users, Settings } from 'lucide-react';

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to WMS
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {user ? `Hello, ${user.fullName || user.username}!` : 'Hello, Guest!'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <HomeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Dashboard</h2>
            <p className="text-gray-600">View your dashboard and analytics</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Users</h2>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Settings</h2>
            <p className="text-gray-600">Configure system preferences</p>
          </div>
        </div>

        {user && (
          <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">User Information</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Username:</span> {user.username}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Status:</span> {user.status}</p>
              {user.roles && <p><span className="font-medium">Roles:</span> {user.roles}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


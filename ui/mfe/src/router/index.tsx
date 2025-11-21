import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { lazy, Suspense } from 'react';

const UmsApp = lazy(() => import('ums/App'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'ums',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div className="p-8">Loading UMS...</div>}>
              <UmsApp />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-gray-600 mt-2">Settings page coming soon...</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;


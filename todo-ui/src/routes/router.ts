import { createBrowserRouter } from 'react-router';
import Home from '../pages/home';
import Receiving from '../pages/receiving';
import DefaultLayout from '../layouts/DefaultLayout';
import Inventory from '../pages/inventory';
import Login from '../pages/login/Login';

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      { path: '/', Component: Home },
      { path: '/login', Component: Login },
      { path: '/receiving', Component: Receiving },
      { path: '/inventory', Component: Inventory },
    ],
  },
]);

export default router;

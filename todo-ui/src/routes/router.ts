import { createBrowserRouter } from 'react-router';
import Home from '../pages/home';
import Receiving from '../pages/receiving';
import DefaultLayout from '../layouts/DefaultLayout';
import Inventory from '../pages/inventory';

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      { path: '/', Component: Home },
      { path: '/receiving', Component: Receiving },
      { path: '/inventory', Component: Inventory },
    ],
  },
]);

export default router;

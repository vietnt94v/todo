import { createBrowserRouter } from 'react-router';
import Home from '../pages/home';
import Receiving from '../pages/receiving';
import DefaultLayout from '../layouts/DefaultLayout';

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      { path: '/', Component: Home },
      { path: '/receiving', Component: Receiving },
    ],
  },
]);

export default router;

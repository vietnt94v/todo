import type { RouteObject } from 'react-router-dom';
import {
  Home,
  ButtonDemo,
  InputDemo,
  TableDemo,
  ModalDemo,
  DrawerDemo,
  DropdownDemo,
} from '@/pages';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/button',
    element: <ButtonDemo />,
  },
  {
    path: '/input',
    element: <InputDemo />,
  },
  {
    path: '/table',
    element: <TableDemo />,
  },
  {
    path: '/modal',
    element: <ModalDemo />,
  },
  {
    path: '/drawer',
    element: <DrawerDemo />,
  },
  {
    path: '/dropdown',
    element: <DropdownDemo />,
  },
];

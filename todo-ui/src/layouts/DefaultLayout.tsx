import { Outlet } from 'react-router';
import Header from '../components/layouts/Header';

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div className="p-3">
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;

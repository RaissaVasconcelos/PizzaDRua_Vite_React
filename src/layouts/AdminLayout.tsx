import { Outlet } from 'react-router-dom';
import { HeaderAdmin } from '../components/HeaderAdmin';


export const AdminLayout = () => {
  return (
    <>
      <HeaderAdmin />
      <main className=" m-auto mx-3  flex flex-col items-center justify-start">
        <Outlet />
      </main>
    </>
  );
};
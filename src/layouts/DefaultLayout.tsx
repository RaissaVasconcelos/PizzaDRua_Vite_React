import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';


export const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] m-auto  flex flex-col items-center justify-start">
          <Outlet />
      </main>
    </>
  );
};
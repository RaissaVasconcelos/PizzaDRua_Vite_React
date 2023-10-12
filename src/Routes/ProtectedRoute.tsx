import { RouteProps, redirect, useNavigate } from 'react-router-dom';
import { parseCookies } from 'nookies';
import { ReactNode } from 'react';
import { ContextApp } from '../context/context-app';


interface ProtectedRouteProps {
  children: ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const {isAuthenticated} = ContextApp()
  const navigate = useNavigate();
  console.log(isAuthenticated, 'authToken');

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return navigate('/sign-in');
  }

}

export default ProtectedRoute;
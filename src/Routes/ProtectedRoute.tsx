import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { ContextApp } from '../context/context-app';


interface ProtectedRouteProps {
  children: ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const {isAuthenticated} = ContextApp()
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/sign-in');
    return;
  }
  return <>{children}</>;

}

export default ProtectedRoute;
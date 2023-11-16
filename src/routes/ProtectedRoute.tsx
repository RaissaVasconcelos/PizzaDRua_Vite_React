import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { ContextAuthApp } from '../context/auth-context';


interface ProtectedRouteProps {
  children: ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const {isAuthenticated} = ContextAuthApp()
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/sign-in');
    return;
  }
  return <>{children}</>;

}

export default ProtectedRoute;
import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { destroyCookie, parseCookies } from 'nookies';
import { ContextAuthApp } from '../context/auth-context';

interface ProtectedRouteAdminProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number;
  // Outras propriedades do payload, se houver
}

function ProtectedRouteAdmin({ children }: ProtectedRouteAdminProps) {
  
  const navigate = useNavigate();
  const  isAuthenticatedAdmin  = parseCookies().token
  
  useEffect(() => {
    if (isAuthenticatedAdmin) {
      const decodedToken = jwt_decode(parseCookies().token) as DecodedToken
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log('Token expirado')
        destroyCookie(null, 'token');
        navigate('/admin/sign-in');
      }
    }else {
      navigate('/admin/sign-in');
    }
    
  }, [isAuthenticatedAdmin]);
  
  
  return <>{children}</>;
}
export default ProtectedRouteAdmin;
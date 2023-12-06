/* eslint-disable prefer-const */
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from "nookies";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../services/firebaseConfig';


interface childrenProps {
  children: ReactNode
}


const provider = new GoogleAuthProvider();
const auth = getAuth(app);

type AuthContextType = {
  customer: any
  isAuthenticated: boolean
  statusOrder: string
  setStatusOrder: (status: string) => void
  handleSignInGoogle: () => void

}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
)

export const AuthProvider = ({ children }: childrenProps) => {

  const [statusOrder, setStatusOrder] = useState('')
  const [customer, setCustomer] = useState<any>(() => {
    const cookieCustomer = parseCookies().customer
    return cookieCustomer ? JSON.parse(cookieCustomer) : null
  })

  const handleSignInGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        user.getIdToken().then((token) => {
          setCookie(undefined, 'accessToken', JSON.stringify(token))
        })
        setCookie(undefined, 'customer', JSON.stringify(user))
        setCustomer(user)

      }).catch((error) => {
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });

  }

  const loadCookiesAuth = () => {
    const token = parseCookies().accessToken
    const customer = parseCookies().customer
    if (token && customer) {
      setCustomer(JSON.parse(customer))
    }
  }

  useEffect(() => {
    loadCookiesAuth()
  }, [])


  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated: !!parseCookies().accessToken,
        handleSignInGoogle,
        statusOrder,
        setStatusOrder
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function ContextAuthApp(): AuthContextType {
  const context = useContext(AuthContext);
  return context;
}
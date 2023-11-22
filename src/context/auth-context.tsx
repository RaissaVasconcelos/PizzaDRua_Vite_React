/* eslint-disable prefer-const */
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from "nookies";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../services/firebaseConfig';
import ServiceAddress from '../infrastructure/services/address'

interface childrenProps {
  children: ReactNode
}

export interface AddressProps {
  customerId: string
  type: "HOME" | "WORK" | "OTHER"
  street: string
  number: string
  standard: boolean,
  neighborhood: {
    id: string
    name: string
    tax: string
    status?: string
  }
  zipCode: string
  phone: string
  id: string

}

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

type AuthContextType = {
  addresses: AddressProps[]
  setAddresses: (Address: AddressProps[]) => void
  customer: any
  isAuthenticated: boolean
  statusOrder: string
  setStatusOrder: (status: string) => void
  currentAddress: AddressProps | null
  handleSignInGoogle: () => void
  
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
)

export const AuthProvider = ({ children }: childrenProps) => {
  const serviceAddress = new ServiceAddress()
  const [addresses, setAddresses] = useState<AddressProps[]>([])
  const [currentAddress, setCurrentAddress] = useState<AddressProps | null>(null);
  const [statusOrder, setStatusOrder] = useState('')
  const [customer, setCustomer] = useState<any>(() => {
    const cookieCustomer = parseCookies().customer
    return cookieCustomer ? JSON.parse(cookieCustomer) : null
  })

  const getAddresses = async () => {
    const response = await serviceAddress.showAddress()
    const addresses = response.body as any 
    const standardAddress = addresses?.find((element: AddressProps) => element.standard === true)
    setCurrentAddress(standardAddress)
    setAddresses(addresses)
  }

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
    getAddresses()
    loadCookiesAuth()
  }, [])


  return (
    <AuthContext.Provider
      value={{
        addresses,
        currentAddress,
        customer,
        isAuthenticated: !!parseCookies().accessToken,
        setAddresses,
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
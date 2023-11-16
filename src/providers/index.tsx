import { ReactNode } from 'react'
import { AuthProvider } from '../context/auth-context'
import { CartProvider } from '../context/cart-context'

interface ProviderProps {
  children: ReactNode
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  )
}
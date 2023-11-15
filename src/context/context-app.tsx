/* eslint-disable prefer-const */
import { api } from '../utils/axios'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { produce } from "immer";
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
  }
  zipCode: string
  phone: string
  id: string

}

export interface ProductProps {
  id: string
  type: 'TRADITIONAL' | 'SPECIAL'
  image_url?: string
  category: {
    name: string
  }
  product: { name: string }[]
  description: string
  size: string
  price: string
  status: string
  mode?: string
}

export interface OrdersCartProps extends ProductProps {
  quantityProduct: number;
}


interface GroupOptions {
  label: string
  options: ProductProps[]
}



const provider = new GoogleAuthProvider();
const auth = getAuth(app);

type PizzaDRuaContextType = {
  products: ProductProps[]
  addresses: AddressProps[]
  customer: any
  isAuthenticated: boolean
  statusOrder: string
  setStatusOrder: (status: string) => void
  currentAddress: AddressProps | null
  groupOptions: GroupOptions[]
  productToCart: OrdersCartProps[]
  neighborhoods: any[]
  clearCart: () => void
  setAddresses: (Address: AddressProps[]) => void
  addProductToCart: (product: OrdersCartProps) => void
  setOnChangeCatalog: (catalog: string) => void
  removeProductFromCart: (productId: string) => void
  handleSignInGoogle: () => void
  onChangeCatalog: string
  cartProductsTotalPrice: number
  totalItemsOnCart: number
}

export const PizzaDRuaContext = createContext<PizzaDRuaContextType>(
  {} as PizzaDRuaContextType,
)

const filterType = (type: string, arr: ProductProps[]) => {
  const arrOption = arr.filter((element) => element.type === type).map((element) => {
    return {
      value: element.product[0].name,
      label: element.product[0].name,
      price: element.price,
      type: element.type,
      color: element.type === 'TRADITIONAL' ? '#ae7a47' : '#3f1503',
    }
  })

  return arrOption
}

export const PizzaDRuaProvider = ({ children }: childrenProps) => {
  const serviceAddress = new ServiceAddress()
  const [products, setProducts] = useState<ProductProps[]>([])
  const [addresses, setAddresses] = useState<AddressProps[]>([])
  const [neighborhoods, setNeighborhoods] = useState([])
  const [currentAddress, setCurrentAddress] = useState<AddressProps | null>(null);
  const [onChangeCatalog, setOnChangeCatalog] = useState('PIZZA')
  const [customer, setCustomer] = useState<any>(() => {
    const cookieCustomer = parseCookies().customer
    return cookieCustomer ? JSON.parse(cookieCustomer) : null
  })
  const [statusOrder, setStatusOrder] = useState('')

  const [productToCart, setProductToCart] = useState<OrdersCartProps[]>(
    () => {
      const storagedCart = parseCookies().product
      return storagedCart ? JSON.parse(storagedCart) : []
    }
  )
  const [groupOptions, setGroupOptions] = useState<any[]>([])

  const getFlavors = async () => {

    const response = await api.get('/product')
    const groupData = [
      {
        label: 'TRADITIONAL',
        options: filterType('TRADITIONAL', response.data)
      },
      {
        label: 'SPECIAL',
        options: filterType('SPECIAL', response.data)
      }
    ]

    setProducts(response.data)
    setGroupOptions(groupData)
  }

  const cartProductsTotalPrice = productToCart.reduce((acc, item) => {
    const priceString = item.price.replace(',', '.');
    const price = parseFloat(priceString);
    return acc + price * item.quantityProduct;
  }, 0);

  let totalItemsOnCart = (productToCart.length)

  const clearCart = () => {
    setProductToCart([])
    totalItemsOnCart = 0
  }

  const addProductToCart = (product: OrdersCartProps) => {
    const checkIfProductExists = productToCart.findIndex(
      (item) => item.id === product.id)
    const newProduct = produce(productToCart, (draft) => {
      if (checkIfProductExists < 0) {
        draft.push(product)
      } else {
        draft[checkIfProductExists].quantityProduct += product.quantityProduct
      }
    })
    setProductToCart(newProduct)
    setCookie(undefined, 'product', JSON.stringify(newProduct), {
      maxAge: 60 * 60 * 24 * 30,
    })
  }


  const removeProductFromCart = (productId: string) => {
    const findProduct = produce(productToCart, (draft) => {
      const productExists = productToCart.findIndex(
        (item) => item.id === productId
      );
      if (productExists >= 0) {
        draft.splice(productExists, 1);
      }
    });
    setCookie(undefined, 'product', JSON.stringify(findProduct), {})
    setProductToCart(findProduct)
  };

  const getAddresses = async () => {
    const response = await serviceAddress.showAddress()
    const addresses = response.body as any 
    const standardAddress = addresses?.find((element: AddressProps) => element.standard === true)
    setCurrentAddress(standardAddress)
    setAddresses(addresses)
  }

  const getNeighborhoods = async () => {
    const response = await api.get('/neighborhood')

    setNeighborhoods(response.data.map((element: any) => {
      return {
        label: element.name,
        value: element.name,
        id: element.id
      }
    }))
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
    getFlavors()
    getAddresses()
    getNeighborhoods()
    loadCookiesAuth()
  }, [])


  return (
    <PizzaDRuaContext.Provider value={{
      addresses,
      products,
      onChangeCatalog,
      currentAddress,
      groupOptions,
      productToCart,
      customer,
      isAuthenticated: !!parseCookies().accessToken,
      neighborhoods,
      cartProductsTotalPrice,
      totalItemsOnCart,
      setAddresses,
      clearCart,
      setOnChangeCatalog,
      handleSignInGoogle,
      addProductToCart,
      removeProductFromCart,
      statusOrder,
      setStatusOrder
    }}>
      {children}
    </PizzaDRuaContext.Provider>
  )
}

export function ContextApp(): PizzaDRuaContextType {
  const context = useContext(PizzaDRuaContext);
  return context;
}
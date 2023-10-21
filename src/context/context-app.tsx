import { api } from '../utils/axios'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { produce } from "immer";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import jwtDecode from 'jwt-decode';

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

interface JwtToken {
  exp: number;
  // Outros campos do token, se houver
}

interface GroupOptions {
  label: string
  options: ProductProps[]
}

type PizzaDRuaContextType = {
  products: ProductProps[]
  addresses: AddressProps[]
  statusOrder: string
  setStatusOrder: (status: string) => void
  currentAddress: AddressProps | null
  groupOptions: GroupOptions[]
  productToCart: OrdersCartProps[]
  neighborhoods: any[]
  cartTotalPrice: string
  isAuthenticated: boolean
  setCartTotalPrice: (price: string) => void
  setAddresses:(Address: AddressProps[]) => void
  addProductToCart: (product: OrdersCartProps) => void
  setOnChangeCatalog: (catalog: string) => void
  removeProductFromCart: (productId: string) => void
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
  const [products, setProducts] = useState<ProductProps[]>([])
  const [addresses, setAddresses] = useState<AddressProps[]>([])
  const [neighborhoods, setNeighborhoods] = useState([])
  const [currentAddress, setCurrentAddress] = useState<AddressProps | null>(null);
  const [onChangeCatalog, setOnChangeCatalog] = useState('PIZZA')
  const [cartTotalPrice, setCartTotalPrice] = useState('')
  const [statusOrder, setStatusOrder] = useState('')

  const [productToCart, setProductToCart] = useState<OrdersCartProps[]>(
    () => {
      const storagedCart = parseCookies().product
      return storagedCart ? JSON.parse(storagedCart) : []
    }
  )
  const [groupOptions, setGroupOptions] = useState<any[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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

  useEffect(() => {
    if (!productToCart) {
      return;
    }

    if (parseCookies().delivery) {
      const data = parseCookies().delivery
      const methodDelivery = JSON.parse(data)
      const dataAddressTax = currentAddress ? currentAddress.neighborhood.tax : '0.00'

      const tax = methodDelivery.deliveryMethod === 'DELIVERY' ? dataAddressTax : '0.00';
      const totalPriceProduct = cartProductsTotalPrice.toFixed(2);
      const totalPrice = (parseFloat(totalPriceProduct) + parseFloat(tax)).toFixed(2);
      setCartTotalPrice(totalPrice); 
    }

  }, [productToCart, currentAddress])



  const totalItemsOnCart = (productToCart.length)

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
    const token = parseCookies().accessToken

    const response = await api.get('/address', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const standardAddress = response.data.find((element: AddressProps) => element.standard === true)
    setCurrentAddress(standardAddress)
    setAddresses(response.data)
    
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



  const isTokenExpired = () => {
    const token = parseCookies().accessToken
    if (!token) return true
    const decodedToken: JwtToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    if (decodedToken.exp < currentTime) {
      destroyCookie(null, 'accessToken')
    }
  }

  useEffect(() => {
    const token = parseCookies().accessToken
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    getFlavors()
    getAddresses()
    getNeighborhoods()
    isTokenExpired()
  }, [])
 
  return (
    <PizzaDRuaContext.Provider value={{
      addresses,
      products,
      onChangeCatalog,
      currentAddress,
      groupOptions,
      productToCart,
      neighborhoods,
      cartProductsTotalPrice,
      isAuthenticated,
      totalItemsOnCart,
      setAddresses,
      setOnChangeCatalog,
      cartTotalPrice,
      setCartTotalPrice,
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
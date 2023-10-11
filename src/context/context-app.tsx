import { api } from '../utils/axios'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { produce } from "immer";
import { setCookie, parseCookies } from "nookies";

interface childrenProps {
  children: ReactNode
}

export interface AddressProps {
  type: string
  street: string
  number: string
  standard: boolean,
  neighborhood: {
    name: string
    tax: string
  }
  zipCode: string
  phone: string
  id: number
}

export interface ProductProps {
  id: string
  type?: 'TRADITIONAL' | 'SPECIAL'
  image_url: string
  category: {
    name: string
  }
  product: { name: string }[]
  description: string
  size: string
  price: string
  mode?: string
}

export interface OrdersCartProps extends ProductProps {
  quantityProduct: number;
}

interface GroupOptions {
  label: string
  options: ProductProps[]
}

type PizzaDRuaContextType = {
  flavors: ProductProps[]
  addresses: AddressProps[]
  currentAddress: AddressProps | null
  groupOptions: GroupOptions[]
  productToCart: OrdersCartProps[]
  cartTotalPrice: string
  setCartTotalPrice: (price: string) => void
  addProductToCart: (product: OrdersCartProps) => void
  setonChangeCatalog: (catalog: string) => void
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
  const [flavors, setFlavors] = useState<ProductProps[]>([])
  const [addresses, setAddresses] = useState<AddressProps[]>([])
  const [currentAddress, setCurrentAddress] = useState<AddressProps | null>(null);
  const [onChangeCatalog, setonChangeCatalog] = useState('PIZZA')
  const [cartTotalPrice, setCartTotalPrice] = useState('')
  const [productToCart, setProductToCart] = useState<OrdersCartProps[]>(
    () => {
      const storagedCart = parseCookies().product
      return storagedCart ? JSON.parse(storagedCart) : []
    }
  )
  const [groupOptions, setGroupOptions] = useState<any[]>([])

  

  const getFlavors = async () => {

    const response = await api.get('/catalog')
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

    setFlavors(response.data)
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

    const tax = currentAddress ? currentAddress.neighborhood.tax : '0.00';
    const totalPriceProduct = cartProductsTotalPrice.toFixed(2);
    const totalPrice = (parseFloat(totalPriceProduct) + parseFloat(tax)).toFixed(2);

    setCartTotalPrice(totalPrice);
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
    const response = await api.get('/address')
    const standardAddress = response.data.find((element: AddressProps) => element.standard === true)
    setCurrentAddress(standardAddress)
    setAddresses(response.data)

  }

  useEffect(() => {
    getFlavors()
    getAddresses()
  
  }, [])

  return (
    <PizzaDRuaContext.Provider value={{
      addresses,
      flavors,
      onChangeCatalog,
      currentAddress,
      groupOptions,
      productToCart,
      cartProductsTotalPrice,
      totalItemsOnCart,
      cartTotalPrice,
      setCartTotalPrice,
      setonChangeCatalog,
      addProductToCart,
      removeProductFromCart,
    }}>
      {children}
    </PizzaDRuaContext.Provider>
  )
}

export function ContextApp(): PizzaDRuaContextType {
  const context = useContext(PizzaDRuaContext);
  return context;
}
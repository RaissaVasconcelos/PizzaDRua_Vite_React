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
  neighborhood: {
    name: string
    tax: string
  }

  zipCode: string
  phone: string
  id: number
}

interface ProductProps {
  id: number
  type?: 'TRADITIONAL' | 'SPECIAL'
  image_url: string
  category: {
    name: string
  }
  name: string
  description: string
  price: string
}

export interface PizzaPersonalizeProps {
  size: 'MEDIUM' | 'HALF'
  finalPrice: string
  flavor: {
    value: string
    label: string
    type?: 'TRADITIONAL' | 'SPECIAL'
    price?: string
    image?: string
  }[]
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
  getAddress: AddressProps
  groupOptions: GroupOptions[]
  productToCart: OrdersCartProps[]
  productPersonalize: PizzaPersonalizeProps[]
  addProductPersonalize: (product: PizzaPersonalizeProps) => void
  addProductToCart: (product: OrdersCartProps) => void
  setonChangeCatalog: (catalog: string) => void
  removeProductFromCart: (productId: number) => void
  removeProductPersonalizeFromCart: (productSize: string) => void
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
      value: element.name,
      label: element.name,
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
  const [getAddress, setGetAddress] = useState<AddressProps>(
    () => {
      const storaged = parseCookies().address
      return storaged ? JSON.parse(storaged) : null
    });
  const [onChangeCatalog, setonChangeCatalog] = useState('PIZZA')
  const [productPersonalize, setProductPersonalize] = useState<PizzaPersonalizeProps[]>(
    () => {
      const storagedCart = parseCookies().productPersonalize
      return storagedCart ? JSON.parse(storagedCart) : []
    })
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



  const addProductPersonalize = (product: PizzaPersonalizeProps) => {
    const newFlavors = produce(productPersonalize, (draft) => {
      if (productPersonalize.length === 0) {
        draft.push(product)
      }
    })
    setProductPersonalize(newFlavors)
    setCookie(undefined, 'productPersonalize', JSON.stringify(newFlavors), {
      maxAge: 60 * 60 * 24 * 30,
    })
  }
  const removeProductPersonalizeFromCart = (productSize: string | undefined) => {
    const findProduct = produce(productPersonalize, (draft) => {
      const productExists = productPersonalize.findIndex(
        (item) => item.size === productSize
      );
      if (productExists >= 0) {
        draft.splice(productExists, 1);
      }
    });
    setProductPersonalize(findProduct)
    setCookie(undefined, 'productPersonalize', JSON.stringify(findProduct), {})
  };

  const cartProductsTotalPrice = productToCart.reduce((acc, item) => {
    const priceString = item.price.replace(',', '.')
    const price = parseFloat(priceString)
    return acc + price * item.quantityProduct;
  }, 0);



  const totalItemsOnCart = (productToCart.length + productPersonalize.length)

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


  const removeProductFromCart = (productId: number) => {
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
      getAddress,
      groupOptions,
      productToCart,
      cartProductsTotalPrice,
      totalItemsOnCart,
      productPersonalize,
      addProductPersonalize,
      setonChangeCatalog,
      addProductToCart,
      removeProductFromCart,
      removeProductPersonalizeFromCart
    }}>
      {children}
    </PizzaDRuaContext.Provider>
  )
}

export function ContextApp(): PizzaDRuaContextType {
  const context = useContext(PizzaDRuaContext);
  return context;
}
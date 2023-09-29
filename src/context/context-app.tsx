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
  drinks: ProductProps[]
  groupOptions: GroupOptions[]
  productToCart: OrdersCartProps[]
  drinkToCart: OrdersCartProps[]
  productPersonalize: PizzaPersonalizeProps[]
  addProductPersonalize: (product: PizzaPersonalizeProps) => void
  addProductToCart: (product: OrdersCartProps) => void
  addDrinkToCart: (product: OrdersCartProps) => void
  setonChangeCatalog: (catalog: string) => void
  setOnChangeType: (type: string) => void
  removeProductFromCart: (productId: number) => void
  removeDrinkFromCart: (drinkId: number) => void
  removeProductPersonalizeFromCart: (productSize: string) => void
  onChangeCatalog: string
  onChangeType: string
  cartProductsTotalPrice: number
  cartDrinksTotalPrice: number
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
  const [onChangeCatalog, setonChangeCatalog] = useState('PIZZA')
  const [onChangeType, setOnChangeType] = useState('TRADITIONAL')
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
  const [drinkToCart, setDrinkToCart] = useState<OrdersCartProps[]>(
    () => {
      const storagedCart = parseCookies().drink
      return storagedCart ? JSON.parse(storagedCart) : []
    }
  )
  const [drinks, setDrinks] = useState<ProductProps[]>([])



  const getDrinks = async () => {
    const response = await api.get('/drinks')
    setDrinks(response.data)
  }

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
      draft.push(product)
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

  const cartDrinksTotalPrice = drinkToCart.reduce((acc, item) => {
    const priceString = item.price.replace(',', '.')
    const price = parseFloat(priceString)
    return acc + price * item.quantityProduct;
  }, 0)


  const totalItemsOnCart = (productToCart.length + drinkToCart.length + productPersonalize.length)

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


  const addDrinkToCart = (drink: OrdersCartProps) => {
    const checkIfProductExists = drinkToCart.findIndex(
      (item) => item.id === drink.id)
    const newProduct = produce(drinkToCart, (draft) => {
      if (checkIfProductExists < 0) {
        draft.push(drink)
      } else {
        draft[checkIfProductExists].quantityProduct += drink.quantityProduct
      }
    })
    setCookie(undefined, 'drink', JSON.stringify(newProduct), {
      maxAge: 60 * 60 * 24 * 30,
    })
    setDrinkToCart(newProduct)
  }

  const removeDrinkFromCart = (drinkId: number) => {
    const findDrink = produce(drinkToCart, (draft) => {
      const drinkExists = drinkToCart.findIndex(
        (item) => item.id === drinkId
      );
      if (drinkExists >= 0) {
        draft.splice(drinkExists, 1);
      }
    });
    setCookie(undefined, 'drink', JSON.stringify(findDrink), {})
    setDrinkToCart(findDrink)
  };

  const getAddresses = async () => {
    const response = await api.get('/address')
    setAddresses(response.data)
  }


  useEffect(() => {
    getFlavors()
    getAddresses()
    getDrinks()
  }, [])

  return (
    <PizzaDRuaContext.Provider value={{
      addresses,
      flavors,
      onChangeCatalog,
      drinks,
      groupOptions,
      productToCart,
      drinkToCart,
      cartProductsTotalPrice,
      cartDrinksTotalPrice,
      totalItemsOnCart,
      productPersonalize,
      onChangeType,
      setOnChangeType,
      addProductPersonalize,
      setonChangeCatalog,
      addProductToCart,
      addDrinkToCart,
      removeProductFromCart,
      removeDrinkFromCart,
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
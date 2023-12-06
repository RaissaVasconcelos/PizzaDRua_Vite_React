import { useContext, createContext, ReactNode, useState, useEffect } from 'react'
import { setCookie, parseCookies } from "nookies";
import { produce } from "immer";
import ProductService from '../infrastructure/services/product'
import ServiceAddress from '../infrastructure/services/address'

interface ChildrenProps {
  children: ReactNode
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

interface GroupOptions {
  label: string
  options: ProductProps[]
}

interface cartTypeContext {
  products: ProductProps[]
  productToCart: OrdersCartProps[]
  groupOptions: GroupOptions[]
  clearCart: () => void
  addProductToCart: (product: OrdersCartProps) => void
  setOnChangeCatalog: (catalog: string) => void
  removeProductFromCart: (productId: string) => void
  removeProductInCart: (products: OrdersCartProps) => void
  addresses: AddressProps[]
  setAddresses: (Address: AddressProps[]) => void
  currentAddress: AddressProps | null
  onChangeCatalog: string
  cartProductsTotalPrice: number
  totalItemsOnCart: number
}

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

export const CartContext = createContext<cartTypeContext>({} as cartTypeContext)

export const CartProvider = ({ children }: ChildrenProps) => {
  const serviceProduct = new ProductService()
  const [products, setProducts] = useState<ProductProps[]>([])
  const [groupOptions, setGroupOptions] = useState<any[]>([])
  const [onChangeCatalog, setOnChangeCatalog] = useState('PIZZA')
  const [addresses, setAddresses] = useState<AddressProps[]>([])
  const [currentAddress, setCurrentAddress] = useState<AddressProps | null>(null);
  const [productToCart, setProductToCart] = useState<OrdersCartProps[]>(
    () => {
      const storagedCart = parseCookies().product
      return storagedCart ? JSON.parse(storagedCart) : []
    }
  )
  const serviceAddress = new ServiceAddress()

  const getFlavors = async () => {
    const response = await serviceProduct.showProduct()
    const groupData = [
      {
        label: 'TRADITIONAL',
        options: filterType('TRADITIONAL', response.body as any)
      },
      {
        label: 'SPECIAL',
        options: filterType('SPECIAL', response.body as any)
      }
    ]

    setProducts(response.body)
    setGroupOptions(groupData)
  }

  const cartProductsTotalPrice = productToCart.reduce((acc, item) => {
    const priceString = item.price.replace(',', '.');
    const price = parseFloat(priceString);
    return acc + price * item.quantityProduct;
  }, 0);

  let totalItemsOnCart = (productToCart.reduce((acc, item) => {
    return acc + item.quantityProduct
  }, 0))


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

  const removeProductInCart = (product: OrdersCartProps) => {
    const checkIfProductExists = productToCart.findIndex(
      (item) => item.id === product.id
    );
    const newProduct = produce(productToCart, (draft) => {
      if (checkIfProductExists >= 0) {
        draft[checkIfProductExists].quantityProduct -= 1;

        if (draft[checkIfProductExists].quantityProduct <= 0) {
          draft.splice(checkIfProductExists, 1);
        }
      }
    });
    setProductToCart(newProduct);
    setCookie(undefined, 'product', JSON.stringify(newProduct), {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

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

  useEffect(() => {
    getFlavors()
    getAddresses()
  }, [])

  return (
    <CartContext.Provider
      value={{
        products,
        productToCart,
        groupOptions,
        onChangeCatalog,
        addresses,
        currentAddress,
        setAddresses,
        cartProductsTotalPrice,
        totalItemsOnCart,
        clearCart,
        setOnChangeCatalog,
        addProductToCart,
        removeProductFromCart,
        removeProductInCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function ContextCartApp(): cartTypeContext {
  const context = useContext(CartContext)
  return context
}  
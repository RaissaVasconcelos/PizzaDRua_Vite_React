import { Minus, Plus, Trash } from "lucide-react";
import { ContextCartApp, OrdersCartProps } from "../../../context/cart-context";

interface InputAmountProductsProps {
  quantityProduct: number
  products: OrdersCartProps
  onIncrease: () => void
  onDecrease: () => void
}

export const InputQuantityProductInCart = ({

  products,
  onIncrease,
  onDecrease,
  quantityProduct
}: InputAmountProductsProps) => {

  const { addProductToCart, removeProductInCart } = ContextCartApp()

  const handleAddProductToCart = () => {
    const productToCart = {
      ...products,
      quantityProduct
    }
    addProductToCart(productToCart)
  }

  return (
    <div className="flex items-center justify-center  shadow-sm border-[1px] border-gray-100 rounded gap-4 px-1 bg-white">
      {products.quantityProduct === 1 ? (
        <button
          className="text-blue-500 text-xl py-[.5rem]"
          onClick={() => { removeProductInCart(products) }}

        >
          <Trash size={16} />
        </button>
      ) : (
        <button
          className="text-blue-500 text-xl py-[.5rem]"
          onClick={() => { removeProductInCart(products), onDecrease }}

        >
          <Minus size={16} />
        </button>
      )}
      <span className="text-base">{products.quantityProduct}</span>
      <button
        className="text-blue-500 text-xl"
        onClick={() => { handleAddProductToCart(), onIncrease }}
      >
        <Plus size={16} />
      </button>
    </div>
  )
};

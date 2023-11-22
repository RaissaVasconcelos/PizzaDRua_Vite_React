import { Minus, Plus } from "lucide-react";
import { FormEvent } from "react";

interface InputAmountProductsProps {
  quantityProduct: number;
  onIncrease: (event: FormEvent) => void
  onDecrease: (event: FormEvent) => void
}

export const InputQuantityProductInCart = ({
  quantityProduct,
  onIncrease,
  onDecrease,
}: InputAmountProductsProps) => {

  return (
    <div className="flex items-center justify-center p-1 px-2  rounded gap-2 bg-gray-300">
      <button
        className="text-blue-500 text-xl py-[.5rem]"
        onClick={onIncrease}
        disabled={quantityProduct < 1}
      >
        <Minus size={24} />
      </button>
      <span className="text-xl">{quantityProduct}</span>
      <button
        className="text-blue-500 text-xl"
        onClick={onDecrease}
      >
        <Plus size={24} />
      </button>
    </div>
  )
};

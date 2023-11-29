import pizza from '../../assets/Vector.png'
import pizzaImg from '../../assets/pizza.png'
import pizzaWhite from '../../assets/pizza-white.png'
import half from '../../assets/half.png'
import halfWhite from '../../assets/half-white.png'
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { ContextCartApp, OrdersCartProps, ProductProps } from '../../context/cart-context';
import { Button } from '../../components/ui/button';
import { priceFormatter } from '../../utils/formatter';
import { ToastContainer } from "react-toastify";
import { notify } from '../../utils/toast'
import { useNavigate } from 'react-router-dom'


export default function Personalize() {

  const customizeSchemaBody = z.object({
    size: z.enum(['ENTIRE', 'HALF']),
    finalPrice: z.string().optional(),
  })
  type CustomizeSchema = z.infer<typeof customizeSchemaBody>



  const { addProductToCart, products } = ContextCartApp();

  const [isChecked, setIsChecked] = useState('ENTIRE');
  const [isSelectSpecial, setIsSelectSpecial] = useState(false);
  const [price, setPrice] = useState('00.00');
  const [selectedItems, setSelectedItems] = useState<ProductProps[]>([]);
  const [quantityProduct, setQuantityProduct] = useState(1);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
  } = useForm<CustomizeSchema>({
    resolver: zodResolver(customizeSchemaBody),
    defaultValues: {
      size: 'ENTIRE',
    }
  });


  const handleSubmitForm = (data: CustomizeSchema) => {
    const product: OrdersCartProps = {
      id: uuid(),
      category: {
        name: 'pizza',
      },
      description: '',
      image_url: '',
      price,
      size: data.size,
      product: selectedItems.flatMap((item) =>
        item.product.map((product) => {
          return {
            name: product.name,
          };
        })
      ),
      type: isSelectSpecial ? 'SPECIAL' : 'TRADITIONAL',
      mode: 'MIXED',
      quantityProduct,
      status: 'WAITING'

    }
    addProductToCart(product);
    notify('Produto adicionado ao carrinho', 'bottom');
    navigate('/cart')
  }

  const handleSelectionChange = (item: ProductProps) => {

    if (selectedItems.includes(item)) {
      // Desselecionar o item se já estiver selecionado
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      // Verificar se o número de itens selecionados não excede três
      if (selectedItems.length < 3 && isChecked === 'ENTIRE') {
        setSelectedItems([...selectedItems, item]);
      } else if (selectedItems.length < 2 && isChecked === 'HALF') {
        setSelectedItems([...selectedItems, item]);
      }
    }

  };

  const handleSelectSize = (size: string) => {
    if (size === 'HALF') {
      products.forEach((product) => {
        if (product.category.name === 'pizza' && product.type === 'TRADITIONAL') {
          const productPrice = (parseFloat(product.price) / 2).toFixed(2);
          setPrice(productPrice);
        }
      })
    } else {
      products.forEach((product) => {
        if (product.category.name === 'pizza' && product.type === 'TRADITIONAL') {
          const priceString = (product.price).replace(',', '.');
          const productsPrice = (parseFloat(priceString)).toFixed(2);
          setPrice(productsPrice);

        }
      })
    }
  }

  useEffect(() => {
    const hasSpecialFlavor = selectedItems.some((selectedFlavor) => {
      return selectedFlavor.type === 'SPECIAL';
    });

    // Verifica se algum sabor tradicional foi selecionado
    const hasTraditionalFlavor = selectedItems.some((selectedFlavor) => {
      return selectedFlavor.type === 'TRADITIONAL';
    });

    if (hasSpecialFlavor) {
      // Se houver um sabor especial, use o preço desse sabor
      const specialFlavorPrice = selectedItems.find((selectedFlavor) => selectedFlavor.type === 'SPECIAL')?.price;
      if (specialFlavorPrice) {
        if (isChecked === 'HALF') {
          const priceString = specialFlavorPrice.replace(',', '.');
          setPrice(
            (parseFloat(priceString) / 2).toFixed(2))
        } else {
          const priceString = specialFlavorPrice.replace(',', '.');
          setPrice(parseFloat(priceString).toFixed(2));
        }
      }
      setIsSelectSpecial(true);
    } else if (hasTraditionalFlavor) {
      // Se houver um sabor tradicional, use o preço desse sabor
      const traditionalFlavorPrice = selectedItems.find((selectedFlavor) => selectedFlavor.type === 'TRADITIONAL')?.price;
      if (traditionalFlavorPrice) {
        if (isChecked === 'HALF') {
          const priceString = traditionalFlavorPrice.replace(',', '.'); // Substitua uma vírgula por um ponto
          const priceFloat = (parseFloat(priceString) / 2).toFixed(2);
          setPrice(priceFloat);

        } else {
          const priceString = traditionalFlavorPrice.replace(',', '.');
          setPrice(parseFloat(priceString).toFixed(2));
        }
      }
      setIsSelectSpecial(false);
    }
  }, [selectedItems])

  return (
    <>
      <img src={pizza} className='w-full mt-20 object-contain' width={450} height={350} alt='' />
      <div className='flex flex-col items-center my-5 '>
        <h2 className=' text-gray-700 font-semibold text-xl'>Personalize sua Pizza</h2>
      </div>
      <form onSubmit={handleSubmit(handleSubmitForm)} className='w-full ' action="">
        <div className='bg-white  '>
          <h2 className='text-gray-600 text-base  font-medium p-2 '>Selecione um tamanho</h2>
          <Controller
            control={control}
            name="size"
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex items-center justify-center gap-5 py-5"
                >
                  <RadioGroup.Item
                    value="ENTIRE"
                    onClick={() => {
                      setIsChecked('ENTIRE'),
                        handleSelectSize('ENTIRE'),
                        setSelectedItems([])
                    }}
                    className={`${isChecked === 'ENTIRE' ? 'bg-orange-500' : 'bg-[#f9f9f9]'} flex items-center justify-center text-blue-600 font-semibold  w-20 h-20 rounded-full`}
                  >
                    {isChecked === 'ENTIRE' ? <img src={pizzaWhite} width={60} height={60} alt='' /> : <img src={pizzaImg} width={60} height={60} alt='' />}
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={() => {
                      setIsChecked('HALF'),
                        handleSelectSize('HALF'),
                        setSelectedItems([])
                    }}
                    className={`${isChecked === 'HALF' ? 'bg-orange-500' : 'bg-[#f9f9f9]'} flex items-center justify-center text-blue-600 font-semibold  w-20 h-20 rounded-full`}
                    value="HALF"
                  >
                    {isChecked === 'ENTIRE' ? <img src={half} width={60} height={60} alt='' /> : <img src={halfWhite} width={60} height={60} alt='' />}

                  </RadioGroup.Item>
                </RadioGroup.Root>
              )
            }}
          />
          <div className='h-[1px] bg-gray-200 mx-2'></div>
          <div className='mx-2 p-3 text-gray-500 font-semibold'>
            {
              isChecked === 'ENTIRE'
                ? <p>Pizza de 40 centimetros, com 12 fatias</p>
                : <p>Metade, 20 centimetros, com 6 fatias </p>
            }
          </div>
        </div>
        <div className=' w-full flex flex-col items-center justify-center mb-20'>
          <div className='sticky top-[92px] bg-[#F6F6F9] px-4 py-3  flex flex-col items-start justify-center w-full '>
            <h2 className='text-gray-600 font-semibold'>Escolha a sua Preferencia</h2>
            {isChecked === 'ENTIRE' ? (
              <span className='text-gray-400 font-semibold'>{selectedItems.length} de 3</span>
            ) : (
              <span className='text-gray-400 font-semibold'>{selectedItems.length} de 2</span>
            )}
          </div>
          <div className='bg-white py-5 px-3 flex  items-center justify-start w-full border-b-[1px] border-gray-100'>
            <h2 className="text-gray-600 font-medium">Tradicional</h2>
          </div>
          {products.filter((item) => item.category.name === 'pizza' && item.type === 'TRADITIONAL').map((item) => (
            <div key={item.id} onClick={() => handleSelectionChange(item)} className="bg-white w-full flex items-center justify-between p-[14px] gap-10 border-b-[1px] border-gray-100">
              <div>
                {item.product.map((product) => (
                  <h2
                    key={product.name}
                    className="cursor-pointer"
                  >
                    {product.name}
                  </h2>
                ))}
                <p className='text-gray-300 text-sm'>{item.description}</p>
              </div>
              <input
                type="checkbox"
                id={item.id}
                checked={selectedItems.includes(item)}
                onChange={() => handleSelectionChange(item)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                disabled={isChecked === 'ENTIRE' ? selectedItems.length === 3 && !selectedItems.includes(item) : selectedItems.length === 2 && !selectedItems.includes(item)}
              />
            </div>
          ))}
          <div className='bg-white py-5 px-3 flex  items-center justify-start w-full border-b-[1px] border-gray-100'>
            <h2 className="text-gray-600 font-medium">Especial</h2>
          </div>
          {products.filter((item) => item.category.name === 'pizza' && item.type === 'SPECIAL').map((item) => (
            <div key={item.id} onClick={() => handleSelectionChange(item)} className="bg-white w-full flex items-center justify-between p-[14px] gap-10 border-b-[1px] border-gray-100">
              <div>
                {item.product.map((product) => (
                  <h2
                    key={product.name}
                    className="cursor-pointer"
                  >
                    {product.name}
                  </h2>
                ))}
                <p className='text-gray-300 text-sm'>{item.description}</p>
              </div>
              <input
                type="checkbox"
                id={item.id}
                checked={selectedItems.includes(item)}
                onChange={() => handleSelectionChange(item)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                disabled={isChecked === 'ENTIRE' ? selectedItems.length === 3 && !selectedItems.includes(item) : selectedItems.length === 2 && !selectedItems.includes(item)}
              />
            </div>
          ))}
        </div>
        <div className='fixed border-t-[1px] border-gray-200 bottom-0 bg-white w-full flex items-center justify-between  p-3 py-5 '>
          <div className='flex items-center justify-center gap-4 '>
            <button
              className='disabled:text-gray-300 text-red-500'
              disabled={quantityProduct === 1}
              type='button'
              onClick={() => setQuantityProduct((state) => state - 1)}>
              <Minus size={16} />
            </button>
            <span>{quantityProduct}</span>
            <button type='button' onClick={() => setQuantityProduct((state) => state + 1)}>
              <Plus size={16} className='text-red-500' />
            </button>

          </div>
          <Button

            type='submit'
            disabled={selectedItems.length === 0}
            className='bg-red-500 disabled:bg-gray-300 disabled:text-gray-800 flex items-center justify-between w-8/12 text-base text-gray-100 rounded  hover:bg-red-600'>
            Adicionar
            <span>{priceFormatter.format(Number(price) * quantityProduct)}</span>
          </Button>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}
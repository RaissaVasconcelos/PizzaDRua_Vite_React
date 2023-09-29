import pizza from '../../assets/pizza.svg'
import pizzaIcon from '../../assets/pizzaIcon.svg'
import pizzaWhite from '../../assets/pizza-white.svg'
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { AlertCircle, Pizza, XCircle } from 'lucide-react';
import { useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';
import { ContextApp } from '../../context/context-app';
import { Button } from '../../components/ui/button';
import { priceFormatter } from '../../utils/formatter';
import { useNavigate } from 'react-router-dom';

const colourStyles: StylesConfig<ColourOption, true> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export default function Personalize() {
  const flavorSchema = z.object({
    value: z.string().nonempty('Selecione um sabor'),
    label: z.string().nonempty('Selecione um sabor'),
    type: z.enum(['TRADITIONAL', 'SPECIAL']).optional(),
    price: z.string().optional(),
    image: z.string().optional()

  })
  const customizeSchemaBody = z.object({
    size: z.enum(['MEDIUM', 'HALF']),
    finalPrice: z.string().optional(),
    flavor: z.array(flavorSchema).refine(flavors => flavors.length > 0, {
      message: 'Selecione pelo menos um sabor',
      path: ['flavor'],
    }),
  })
  type CustomizeSchema = z.infer<typeof customizeSchemaBody>
  type FlavorSchema = z.infer<typeof flavorSchema>


  const { addProductPersonalize, groupOptions, flavors } = ContextApp();

  const [isChecked, setIsChecked] = useState('MEDIUM');
  const [isSelectSpecial, setIsSelectSpecial] = useState(false);
  const [price, setPrice] = useState('49.99');
  // const router = useRouter();
  const animatedComponents = makeAnimated();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomizeSchema>({
    resolver: zodResolver(customizeSchemaBody),
    defaultValues: {
      size: 'MEDIUM',
      flavor: [],
    }
  });

  const navigate = useNavigate();

  const handleSubmitForm = (data: CustomizeSchema) => {

    addProductPersonalize({ ...data, finalPrice: price });
    setValue('flavor', []);
    navigate('/cart')
  }

  const handleFlavorChange = (selectedOptions: FlavorSchema[]) => {
    const selectedFlavorsArray = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
      type: option.type,
      price: option.price,
      image: option.image
    }));

    // Verifica se algum sabor especial foi selecionado
    const hasSpecialFlavor = selectedFlavorsArray.some((selectedFlavor) => {
      return selectedFlavor.type === 'SPECIAL';
    });

    // Verifica se algum sabor tradicional foi selecionado
    const hasTraditionalFlavor = selectedFlavorsArray.some((selectedFlavor) => {
      return selectedFlavor.type === 'TRADITIONAL';
    });

    if (hasSpecialFlavor) {
      // Se houver um sabor especial, use o preço desse sabor
      const specialFlavorPrice = selectedFlavorsArray.find((selectedFlavor) => selectedFlavor.type === 'SPECIAL')?.price;
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
      const traditionalFlavorPrice = selectedFlavorsArray.find((selectedFlavor) => selectedFlavor.type === 'TRADITIONAL')?.price;
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
  };

  const handleSelectSize = (size: string) => {
    if (size === 'HALF') {
      flavors.forEach((flavor) => {
        if (flavor.type === 'TRADITIONAL') {
          const flavorPrice = (parseFloat(flavor.price) / 2).toFixed(2);
          setPrice(flavorPrice);
        }
      })
    } else {
      flavors.forEach((flavor) => {
        if (flavor.type === 'TRADITIONAL') {
          const priceString = (flavor.price).replace(',', '.');
          const flavorPrice = (parseFloat(priceString)).toFixed(2);
          setPrice(flavorPrice);

        }
      })
    }
  }

  return (
    <div className="h-screen max-w-[1100px] m-auto flex flex-col items-center justify-start">
      <img src={pizza} className='w-full' width={450} height={350} alt='' />
      <div className='flex flex-col items-center mt-4 '>
        <h2 className=' text-gray-700 font-semibold text-xl'>Personalize sua Pizza</h2>
      </div>
      <form onSubmit={handleSubmit(handleSubmitForm)} className='w-full ' action="">
        <div className='bg-white  m-5'>
          <h2 className='text-gray-200 bg-blue-600 rounded-t-sm p-1 '>TAMANHO</h2>
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
                    value="MEDIUM"

                    onClick={() => {
                      setIsChecked('MEDIUM'),
                      setValue('flavor', [])
                      handleSelectSize('MEDIUM')
                    }}
                    className={`${isChecked === 'MEDIUM' ? 'bg-blue-500' : 'bg-[#B7C6DC]'} flex items-center justify-center text-blue-600 font-semibold  w-20 h-20 rounded-full`}
                  >
                    {isChecked === 'MEDIUM' ? <img src={pizzaWhite} width={60} height={60} alt='' /> : <img src={pizzaIcon} width={60} height={60} alt='' />}
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    onClick={() => {
                      setIsChecked('HALF'),
                        setValue('flavor', [])
                      handleSelectSize('HALF')
                    }}
                    className={`${isChecked === 'HALF' ? 'bg-blue-500' : 'bg-[#B7C6DC]'} flex items-center justify-center text-blue-600 font-semibold  w-20 h-20 rounded-full`}
                    value="HALF"
                  >
                    {isChecked === 'HALF' ? <Pizza size={40} color="#fff" strokeWidth={1} /> : <Pizza size={40} color="#386BED" strokeWidth={1} />}

                  </RadioGroup.Item>
                </RadioGroup.Root>
              )
            }}
          />
          <div className='h-[2px] bg-blue-500 mx-2'></div>
          <div className='mx-2 p-2 text-cyan-500 font-semibold'>
            {
              isChecked === 'MEDIUM'
                ? <p>Pizza de 40 centimetros, com 12 fatias</p>
                : <p>Metade, 20 centimetros, com 6 fatias </p>
            }
          </div>
        </div>
        <div className='bg-white  m-5'>
          <h2 className='text-gray-200 bg-blue-600 rounded-t-sm p-1 '>SABORES</h2>
          <div className='p-5'>
            <Controller
              control={control}
              name="flavor"
              rules={{ required: true }}
              render={({ field }) => (
                isChecked === 'MEDIUM' ? (
                  <Select
                    onChange={(selectedOptions: any) => {
                      field.onChange(selectedOptions); // Atualiza o campo "flavor" com as opções selecionadas
                      handleFlavorChange(selectedOptions); // Atualiza o estado com as opções selecionadas
                    }}
                    options={groupOptions}
                    styles={colourStyles}
                    isMulti
                    value={field.value}
                    components={animatedComponents}
                    isOptionDisabled={() => field.value.length === 3}
                  />
                ) : (
                  <Select
                    onChange={(selectedOptions: any) => {
                      field.onChange(selectedOptions); // Atualiza o campo "flavor" com as opções selecionadas
                      handleFlavorChange(selectedOptions); // Atualiza o estado com as opções selecionadas
                    }}
                    className='Selecione'
                    options={groupOptions}
                    styles={colourStyles}
                    isMulti
                    value={field.value}
                    components={animatedComponents}
                    isOptionDisabled={() => field.value.length === 2}
                  />
                )
              )}
            />

            {errors.flavor && <p className='flex gap-2 rounded-md border-2 border-red-500 bg-red-100 p-2 text-red-500 font-semibold m-2'> <XCircle className='text-red-500' /> Selecione pelo menos um sabor</p>}
            {isSelectSpecial && (
              <p className="border-2 border-yellow-500 bg-yellow-100 p-2 rounded-md text-yellow-500 font-semibold mt-4 flex gap-2 "><AlertCircle className='text-yellow-500' /> Sabor especial selecionado.</p>
            )}
            <div className='h-[2px] bg-blue-500 mt-4' />
            <p className='text-cyan-500 mt-2 font-semibold'>{isChecked === 'MEDIUM' ? 'Voce pode selecionar até 3 sabores' : 'Voce pode selecionar até 2 sabores'}</p>
          </div>
        </div>
        <div className='bg-white  m-5 flex items-center justify-between gap-3 p-5'>
          <div className='flex-col flex items-start justify-center'>
            <span className='text-gray-500 font-semibold text-lg'>Preço</span>
            <span className='text-gray-500 font-bold text-xl'>{priceFormatter.format(Number(price))}</span>
          </div>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='bg-red-500  text-base text-gray-100 rounded  hover:bg-red-600'>
            Adicionar ao carrinho
          </Button>
        </div>
      </form>
    </div>
  )
}
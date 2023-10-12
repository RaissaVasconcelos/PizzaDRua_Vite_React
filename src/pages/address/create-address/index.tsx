import { Controller, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import  { useNavigate }  from 'react-router-dom'
import InputMask from 'react-input-mask';
import { api } from '../../../utils/axios';
import { Label } from '@radix-ui/react-label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { ContextApp } from '../../../context/context-app';




const addressSchemaBody = z.object({
  neighborhood: z.object({
    label: z.string().nonempty('Selecione um bairro'),
    value: z.string().nonempty('Selecione um bairro'),
    rate: z.string().optional(),
  }),
  number: z.string().nonempty('Digite um número'),
  street: z.string().nonempty('O campo rua é obrigatório'),
  type: z.object({
    label: z.string().optional(),
    value: z.string().optional(),
  }),
  phone: z.string()
    .nonempty('O campo telefone é obrigatório')
    .refine((value) => /^\(\d{2}\) \d{5}-\d{4}$/
      .test(value), {
      message: 'Número de telefone inválido',
    }),
  zipCode: z.string()
    .min(8, 'CEP deve conter no mínimo 8 caracteres')
    .max(8, 'CEP deve conter no máximo 8 caracteres')
    .refine((value) => /^\d{8}$/.test(value), {
      message: 'CEP inválido',
    }),
})

type AddressSchema = z.infer<typeof addressSchemaBody>


export default function CreateAddress() {

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchemaBody),

  });
  const {neighborhoods} = ContextApp()
  const navigate = useNavigate()

  const handleSubmitForm = async (data: AddressSchema) => {
    await api.post('/address', {
      neighborhood: data.neighborhood.value,
      number: data.number,
      street: data.street,
      type: data.type.value,
      zipCode: data.zipCode,
      phone: data.phone

    })

    navigate('/address')
  }

  return (
    <div className="h-screen max-w-[1100px] m-auto  flex flex-col items-center justify-start">
      <h1 className="mt-5 font-semibold text-xl">
        Criar um novo endereço
      </h1>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="w-3/4 flex flex-col items-start gap-3 justify-start mt-10 mx-5">
        <h2>Endereço de entrega</h2>
        <Label className='mt-5 text-gray-500'>Bairro</Label>
        <Controller
          control={control}
          name="neighborhood"
          rules={{ required: true }}
          render={({ field }) => (
            <ReactSelect
              onChange={field.onChange}
              className='w-full'
              options={neighborhoods}
              value={field.value}

            />
          )}
        />
        {errors.root && <p className='text-red-500'>{errors.root.message}</p>}
        <Label className='text-gray-500'>Rua</Label>
        <Input
          className='w-full rounded text-gray-600 placeholder:text-gray-400'
          placeholder='EX. Rua João Daniel Martinelli'
          {...register('street')}
        />
        <div className='w-full flex items-center justify-center gap-4'>
          <div className='w-full'>
            <Label className='text-gray-500'>Numero</Label>
            <Input
              type='number'
              className='flex-1 rounded text-gray-600 placeholder:text-gray-400'
              placeholder='numero'
              {...register('number')}
            />
          </div>
          <div className='w-full'>
            <Label className='text-gray-500'>Tipo de Endereco</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <ReactSelect
                  value={field.value}
                  onChange={field.onChange}
                  className='w-full'
                  options={[
                    { value: 'Casa', label: 'Casa' },
                    { value: 'Trabalho', label: 'Trabalho' },
                    { value: 'Outro', label: 'Outro' },
                  ]}
                />

              )}
            />
          </div>
        </div>
        {errors.street && <p className='text-red-500'>{errors.street.message}</p>}
        <Label className='text-gray-500'>Cep</Label>
        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => (
            <InputMask
              className='w-full p-2 rounded text-gray-600'
              mask="99999-999"
              maskPlaceholder=""
              onChange={(e) => {
                const rawValue = e.target.value.replace(/-/g, ''); // Remove hifens
                field.onChange(rawValue);
              }}
              placeholder="00000-000"
            />
          )}
        />
        {errors.zipCode && <p className='text-red-500'>{errors.zipCode.message}</p>}
        <Label className='text-gray-500'>Telefone</Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputMask
              className='w-full p-2 rounded text-gray-600'
              mask="(99) 99999-9999"
              maskPlaceholder=""
              onChange={field.onChange}
              placeholder="(00) 00000-0000"
              value={field.value}
            />
          )}
        />
        {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
        <Button className='w-full mt-4 bg-red-500 hover:bg-red-400' type='submit'>Cadastrar</Button>
      </form>
    </div>
  )
}
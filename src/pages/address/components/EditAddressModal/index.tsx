import * as Dialog from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Label } from "../../../../components/ui/label";
import InputMask from 'react-input-mask';
import ReactSelect from "react-select";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { AddressProps } from "../../../../context/context-app";
import { api } from "../../../../utils/axios";


const addressSchemaBody = z.object({
  neighborhood: z.object({
    label: z.string().nonempty('Selecione um bairro'),
    value: z.string().nonempty('Selecione um bairro'),
    tax: z.string().optional(),
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

type AddressSchema = z.infer<typeof addressSchemaBody>;


export const EditAddressModal = ({ id, neighborhood, number, street, type, phone, zipCode }: AddressProps) => {


  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchemaBody),
    defaultValues: {
      number,
      street,
      type: { label: type, },
      phone,
      zipCode,
      neighborhood: { label: neighborhood.name },
    }
  });

  const data = [
    {
      value: 'Bairro 1',
      label: 'Bairro 1',
      rate: '3',
    },
    {
      value: 'Bairro 2',
      label: 'Bairro 2',
      rate: '3',
    },
    {
      value: 'Bairro 3',
      label: 'Bairro 3',
      rate: '3',
    },
    {
      value: 'Bairro 4',
      label: 'Bairro 4',
      rate: '5',
    },
    {
      value: 'Bairro 5',
      label: 'Bairro 5',
      rate: '5',
    },

  ]

  const handleEditAddressForm = async (data: AddressSchema) => {
    try {

      const response = await api.put(`/address/${id}`, {
        neighborhood: {
          name: data.neighborhood.label,
          tax: data.neighborhood.tax
        },
        number: data.number,
        street: data.street,
        type: data.type.label,
        zipCode: data.zipCode,
        phone: data.phone
      }, {
        headers: {
          'Content-Type': 'application/json',
        },

      })

      if (response.status !== 200) {
        throw new Error('Erro ao atualizar o endereço');
      }

      // O endereço foi atualizado com sucesso
      return response.data

    } catch (error) {
      console.error(error);
      throw error;
    }

  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
      <Dialog.Content className="w-11/12 rounded py-5 flex flex-col items-center bg-[#f3f3f3] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Dialog.Close className="absolute bg-transparent border-spacing-0 top-5 right-5 text-gray-300 line-through ">
          <X size={24} />
        </Dialog.Close>
        <Dialog.Title className="text-gray-600 font-semibold text-xl">
          Editar Endereço
        </Dialog.Title>
        <form onSubmit={handleSubmit(handleEditAddressForm)} className="w-10/12 flex flex-col items-start gap-3 justify-start  mx-5">

          <Label className='mt-5 text-gray-500'>Bairro</Label>
          <Controller
            control={control}
            name="neighborhood"
            rules={{ required: true }}
            render={({ field }) => (
              <ReactSelect
                onChange={field.onChange}
                className='w-full'
                options={data}
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
                value={field.value}
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
          <Button className='w-full mt-4 bg-red-500 hover:bg-red-400' type='submit'>Salvar</Button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
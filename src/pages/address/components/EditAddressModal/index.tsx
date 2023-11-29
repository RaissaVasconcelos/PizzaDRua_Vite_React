import * as Dialog from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Label } from "../../../../components/ui/label";
import InputMask from 'react-input-mask';
import ReactSelect from "react-select";
import { Input } from "../../../../components/ui/input";
import { Switch } from "../../../../components/ui/switch";
import { Button } from "../../../../components/ui/button";
import { AddressProps, ContextAuthApp } from "../../../../context/auth-context";
import { useEffect, useState } from "react";
import { notify } from "../../../../utils/toast";
import { ToastContainer } from "react-toastify";
import Service from '../../../../infrastructure/services/address'
import ServiceNeighborhoods from '../../../../infrastructure/services/neighborhood'


interface NeighborhoodsProps {
  label: string
  value: string
  id: string
}

const addressSchemaBody = z.object({
  neighborhood: z.object({
    label: z.string().optional(),
    value: z.string().optional(),
    tax: z.string().optional(),
  }),
  number: z.string().nonempty('Digite um número'),
  street: z.string().nonempty('O campo rua é obrigatório'),
  type: z.object({
    label: z.enum(['Casa', 'Trabalho', 'Outro']).optional(),
    value: z.enum(['HOME', 'WORK', 'OTHER']).optional(),
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
  standardAddress: z.boolean().optional(),

})

type AddressSchema = z.infer<typeof addressSchemaBody>;

interface EditAddressModalProps {
  address: AddressProps
  setOpenModal: (value: boolean) => void
  openModal: boolean

}

export const EditAddressModal = ({ address, setOpenModal, openModal,  }: EditAddressModalProps) => {
  const serviceNeighborhoods = new ServiceNeighborhoods()
  const service = new Service()
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodsProps[]>([])
  const {setAddresses, addresses} = ContextAuthApp();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchemaBody),
    defaultValues: {
      number: address.number,
      street: address.street,
      neighborhood: {label: address.neighborhood.name},
      phone: address.phone,
      type: { label: address.type === 'HOME' ? 'Casa' : address.type === 'WORK' ? 'Trabalho' : 'Outro' },
      zipCode: address.zipCode,
      standardAddress: address.standard
    }
  });


  const getNeighborhoods = async () => {
    const response = await serviceNeighborhoods.showNeighborhood()
    const neighborhoods = response.body
    
    setNeighborhoods(neighborhoods.filter((item) => item.status === 'ACTIVE').map((element) => {
      return {
        label: element.name,
        value: element.name,
        id: element.id
      }
    }))
  }

  useEffect(() => {
    getNeighborhoods()
  }, [])

 
  const handleEditAddressForm = async (data: AddressSchema) => {
    console.log(data);
    
    try {
       const response = await service.updateAddress({
        neighborhood: data.neighborhood.label,
        id: address.id,  
        number: data.number,
        customerId: address.customerId,
        standard: data.standardAddress,
        street: data.street,
        type: data.type.label,
        zipCode: data.zipCode,
        phone: data.phone
      })

      if (response.statusCode === 200) {
        notify(`Endereco atualizado com sucesso`, 'bottom')
      }
      
      setOpenModal(false)
      
    } catch (error) {
      console.error(error);
    }

  }

  const handleDeleteAddress = async (id: string) => {
    await service.deleteAddress({id});
    const newAddresses = addresses.filter(item => item.id !== id);
    setAddresses(newAddresses);
    setOpenModal(false);
  }

  return (
  <>
    <Dialog.Root open={openModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
        <Dialog.Content className="w-11/12 rounded py-5 flex flex-col items-center bg-[#f3f3f3] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <Dialog.Close onClick={() => setOpenModal(false)}  className="absolute bg-transparent border-spacing-0 top-5 right-5 text-gray-300 line-through ">
            <X size={24} color="red" />
          </Dialog.Close>
          <Dialog.Title className="text-gray-600 font-semibold text-xl">
            Editar Endereço
          </Dialog.Title>
          <form onSubmit={handleSubmit(handleEditAddressForm)} className="w-10/12 flex flex-col items-start gap-3 justify-start  mx-5">

              <Label className='mt-5 text-gray-500'>Bairro</Label>
              <Controller
                control={control}
                name="neighborhood"
                render={({ field }) => (
                  <ReactSelect
                    value={field.value}
                    onChange={field.onChange}
                    className='w-full'
                    options={neighborhoods}

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
              {errors.street && <p className='text-red-500'>{errors.street.message}</p>}
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
                        isSearchable={false}
                        className='w-full'
                        options={[
                          { value: 'HOME', label: 'Casa' },
                          { value: 'WORK', label: 'Trabalho' },
                          { value: 'OTHER', label: 'Outro' },
                        ]}
                      />

                    )}
                  />
                </div>
              </div>
              <Label className='text-gray-500'>Cep</Label>
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <InputMask
                    className='w-full p-2 rounded text-gray-600'
                    mask="99999-999"
                    type="tel"
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
                    type="tel"
                    onChange={field.onChange}
                    placeholder="(00) 00000-0000"
                    value={field.value}
                  />
                )}
              />
              {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
              <Controller
                name="standardAddress"
                control={control}
                render={({ field }) => (
                  <div className="mt-5 w-full flex items-center justify-between gap-2">
                    <span>Definir como endereço padrão</span>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="bg-orange-500" />
                  </div>

                )}
              />

              <Button 
                onClick={() => setOpenModal(true)} 
                className='w-full bg-red-500 mt-5 hover:bg-red-400' 
                type='submit'
              > Salvar
              </Button>
            </form>
            <button onClick={() => handleDeleteAddress(address.id)} className="w-10/12 mt-3 py-2 items-center justify-center font-medium rounded  bg-gray-200 hover:bg-gray-400 text-gray-800  flex gap-2"> Deletar</button>
            
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <ToastContainer />
    </>
  );
};
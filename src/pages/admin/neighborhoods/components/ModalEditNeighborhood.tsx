import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from '../../../../components/ui/label';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import * as Dialog from "@radix-ui/react-dialog";
import { X } from 'lucide-react';
import { api } from '../../../../utils/axios';
import { AxiosError } from 'axios';
import { formatValue } from '../../../../utils/formatter';
import { notify } from '../../../../utils/toast';
import { ToastContainer } from 'react-toastify';
import ReactSelect from 'react-select';

const neighborhoodSchemaBody = z.object({
  name: z.string().nonempty('O campo nome é obrigatório'),
  tax: z.string().nonempty('O campo taxa é obrigatório'),
  status: z.object({
    label: z.string().optional(),
    value: z.string().optional(),
  }),
})

type ProductSchema = z.infer<typeof neighborhoodSchemaBody>

interface NeighborhoodProps {
  id: string
  name: string
  tax: string
  status?: "ACTIVE" | "DISABLE"
}

interface ModalEditNeighborhoodProps {
  neighborhood: NeighborhoodProps
  setIsOpenModalEdit: (isOpen: boolean) => void
  openModalEdit: boolean
}

export default function ModalEditNeighborhood({ neighborhood, openModalEdit, setIsOpenModalEdit }: ModalEditNeighborhoodProps) {

  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(neighborhoodSchemaBody),
    defaultValues: {
      name: neighborhood.name,
      tax: formatValue(neighborhood.tax),
      status: { label: neighborhood.status },
    }
  });
  console.log(neighborhood);
  
  const handleSubmitForm = async (data: ProductSchema) => {
 
    try {
      await api.put('/neighborhood', {
        id: neighborhood.id,
        name: data.name,
        tax: formatValue(data.tax),
        status: data.status.label === "ATIVO" ? 'ACTIVE' : 'DISABLE',
      })
      reset()
      notify('Bairro atualizado com sucesso!', 'top')
      setIsOpenModalEdit(false)
    } catch (error) {
      const customError = error as AxiosError
      if (customError.response?.status === 404) {
        setError('name', {
          type: 'manual',
          message: 'Error ao tentar atualizar!',
        })
      } else {
        console.error(customError)
      }
    }
  }
  return (
    <Dialog.Root open={openModalEdit}>
      <Dialog.Portal >
        <Dialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
        <Dialog.Content className=" lg:w-6/12 w-11/12  rounded py-5 flex flex-col items-center bg-[#f3f3f3] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Close onClick={() => setIsOpenModalEdit(false)} className="absolute bg-transparent border-spacing-0 top-5 right-5 text-gray-300 line-through ">
            <X size={24} className='text-gray-500' onClick={() => { reset() }} />
          </Dialog.Close>
          <Dialog.Title className="text-gray-600 font-semibold text-xl">
            Editar Bairro
          </Dialog.Title>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="mt-10 w-7/12 flex flex-col items-start gap-3 justify-start  mx-5">

            <div className='w-full'>
              <Label className='text-gray-500'>Nome</Label>
              <Input type='text' {...register('name')} className='py-6' />
              {errors.name && (
                <span className="text-red-500 mb-3">{errors.name?.message}</span>
              )}
            </div>

            <div className='flex w-full items-center justify-between gap-5'>

              <div className='w-full'>
                <Label className='text-gray-500'>Taxa</Label>
                <Input type='text' {...register('tax')} />
                {errors.tax && (
                  <span className="text-red-500 mb-3">{errors.tax?.message}</span>
                )}
              </div>
              <div className='w-full'>
                <Label className='text-gray-500'>Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <ReactSelect
                      value={field.value}
                      onChange={field.onChange}
                      className='w-full'
                      options={[
                        { value: 'ATIVO', label: 'ATIVO' },
                        { value: 'DESABILITADO', label: 'DESABILITADO' },
                      ]}
                    />

                  )}
                />
              </div>
            </div>


            <Button className='w-full mt-4 bg-red-500 hover:bg-red-400' type='submit'>
              Cadastrar
            </Button>
          </form>
        </Dialog.Content>
        <ToastContainer />
      </Dialog.Portal>
    </Dialog.Root>
  )
}


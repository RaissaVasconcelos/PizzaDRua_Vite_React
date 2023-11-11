import { useForm } from 'react-hook-form'
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


const productSchemaBody = z.object({

  name: z.string().nonempty('O campo nome é obrigatório'),
  tax: z.string().nonempty('O campo taxa é obrigatório'),
  status: z.object({
    label: z.enum(['ACTIVE', 'DISABLE']).optional(),
    value: z.enum(['ATIVO', 'DESABILITADO']).optional(),
  }),
})

type ProductSchema = z.infer<typeof productSchemaBody>


export default function ModalRegisterNeighborhood() {

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchemaBody),
   
  });



  const handleSubmitForm = async (data: ProductSchema) => {
    try {
    console.log(data);
    await api.post('/neighborhood', {
    name: data.name,
    tax: formatValue(data.tax),
    })
    reset()
    notify('Bairro criado com sucesso!', 'top')  
    } catch (error) {
      const customError = error as AxiosError
      if (customError.response?.status === 401) {
        setError('name', {
          type: 'manual',
          message: 'Bairro ja cadastrado!',
        })
      } else {
        console.error(customError)
      }
    }

  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
        <Dialog.Content className=" lg:w-6/12 w-11/12  rounded py-5 flex flex-col items-center bg-[#f3f3f3] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Close className="absolute bg-transparent border-spacing-0 top-5 right-5 text-gray-300 line-through ">
            <X size={24} className='text-gray-500' onClick={() => { reset() }} />
          </Dialog.Close>
          <Dialog.Title className="text-gray-600 font-semibold text-xl">
            Cadastrar Bairro
          </Dialog.Title>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="mt-10 w-7/12 flex flex-col items-start gap-3 justify-start  mx-5">
      
              <div className='w-full'>
                <Label className='text-gray-500'>Nome</Label>
                <Input type='text' {...register('name')} className='py-6' />
                {errors.name && (
                  <span className="text-red-500 mb-3">{errors.name?.message}</span>
                )}
              </div>

              <div className='w-full'>
                <Label className='text-gray-500'>Taxa</Label>
                <Input type='number' {...register('tax')} className='py-6' placeholder='Ex. 00.00' />
                {errors.tax && (
                  <span className="text-red-500 mb-3">{errors.tax?.message}</span>
                )}
              </div>
           
          
            <Button className='w-full mt-4 bg-red-500 hover:bg-red-400' type='submit'>
              Cadastrar
            </Button>
          </form>
        </Dialog.Content>
        <ToastContainer />
      </Dialog.Portal>
    </>
  )
}



import { Controller, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from '../../../../components/ui/label';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import * as Dialog from "@radix-ui/react-dialog";
import { Image, Trash, X } from 'lucide-react';
import { Textarea } from '../../../../components/ui/textarea';
import { api } from '../../../../utils/axios';
import { useState } from 'react';
import { ProductProps } from '../../../../context/context-app';
import { ToastContainer } from 'react-toastify';
import { notify } from '../../../../utils/toast';


// const maxFileSize = 5 * 1024 * 1024; // 5MB
// const allowedFileTypes = ["image/jpeg", "image/jpg"];


const productSchemaBody = z.object({

  name: z.string().nonempty('O campo nome é obrigatório'),
  description: z.string().nonempty('O campo descrição é obrigatório')
    .max(100, 'O campo descrição deve conter no máximo 100 caracteres'),

  status: z.object({
    label: z.string().optional(),
    value: z.string().optional(),
  }),
  type: z.object({
    label: z.string().optional(),
    value: z.string().optional(),
  }),
  price: z.string().nonempty('Obrigatório'),
  category: z.object({
    label: z.string().optional(),
    value: z.string().optional(),
  }),
  file: z.any()

})

type ProductSchema = z.infer<typeof productSchemaBody>
interface ModalProductsProps {
  product: ProductProps;
  setOpenModal: (isOpen: boolean) => void
  openModal: boolean
}

export default function ModalEditProduct({ product, setOpenModal, openModal }: ModalProductsProps) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(product.image_url);
  const [errorFieldImage, setErrorFieldImage] = useState<string | null>(null);
  const [selectCategory, setSelectCategory] = useState<string | undefined>('Pizza');

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchemaBody),
    defaultValues: {
      name: product.product[0].name,
      description: product.description,
      price: product.price,
      file: product.image_url,
      category: product.category.name === "pizza" ? { label: "Pizza" } : { label: "Bebida" },
      status: product.status === "ACTIVE" ? { label: "ATIVO", value: "ATIVO" } : { label: "DESABILITADO", value: "DESABILITADO" },
      type: product.type === "TRADITIONAL" ? { label: "Tradicional" } : { label: "Especial" },
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewImage(file ? URL.createObjectURL(file) : product.image_url);
    }
  };

  const formatValue = (value: string) => {
    // Remove tudo que não for dígito ou ponto decimal
    value = value.replace(/[^0-9.]/g, '');

    // Remove pontos extras e garante que haja no máximo uma casa decimal
    const parts = value.split('.');
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].slice(0, 2);
    }
    value = parts.join('.');

    // Formata o valor em dólar
    if (value) {
      value = parseFloat(value).toFixed(2);
    }

    return value;
  };


  const handleSubmitForm = async (data: ProductSchema) => {

    if (typeof data.file !== 'string') {
      const imageUrl = await api.post('/upload', data.file)
      await api.put('/product', {
        id: product.id,
        name: data.name,
        size: data.category.label === "Pizza" ? 'ENTIRE' : '',
        description: data.description,
        status: data.status.value === "ATIVO" ? 'ACTIVE' : 'DISABLE',
        type: data.category.label === "Pizza" ? data.type.label === "Especial" ? 'SPECIAL' : 'TRADITIONAL' : '',
        price: formatValue(data.price),
        category: data.category.label === "Pizza" ? 'pizza' : 'drink',
        imageUrl: imageUrl.data
      })

    } else {

      await api.put('/product', {
        id: product.id,
        name: data.name,
        size: data.category.label === "Pizza" ? 'ENTIRE' : '',
        description: data.description,
        status: data.status.value === "ATIVO" ? 'ACTIVE' : 'DISABLE',
        type: data.category.label === "Pizza" ? data.type.label === "Especial" ? 'SPECIAL' : 'TRADITIONAL' : '',
        price: formatValue(data.price),
        category: data.category.label === "Pizza" ? 'pizza' : 'drink',
        imageUrl: data.file
      })

    }

    reset()
    setErrorFieldImage(null)
    notify('Produto editado com sucesso', 'top')
    setOpenModal(false)
  }

  return (
    <Dialog.Root open={openModal} >
      <Dialog.Portal >
        <Dialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
        <Dialog.Content className=" lg:w-7/12 w-11/12  rounded py-5 flex flex-col items-center bg-[#f3f3f3] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Close onClick={() => { setOpenModal(false) }} className="absolute bg-transparent border-spacing-0 top-5 right-5 text-gray-300 line-through ">
            <X size={24} className='text-gray-500' onClick={() => { reset(), setPreviewImage('') }} />
          </Dialog.Close>
          <Dialog.Title className="text-gray-600 font-semibold text-xl">
            Editar Produto
          </Dialog.Title>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="mt-10 w-10/12 flex flex-col items-start gap-3 justify-start  mx-5">
            {
              previewImage ? (
                <div className='flex w-full items-start justify-center'>
                  <img
                    src={previewImage}
                    alt="Prévia da imagem"
                    className="mt-3 h-52 object-contain flex items-center justify-center w-1/2 rounded"
                  />
                  <Trash size={24} className='text-red-500 cursor-pointer' onClick={() => { setPreviewImage(''), reset() }} />
                </div>
              ) : (
                <Label htmlFor="file_input" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover-bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover-border-gray-500 dark:hover-bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Image size={34} className="text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG</p>
                  </div>
                  <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                      <input
                        id='file_input'
                        className="hidden"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            field.onChange(e.target.files);
                            handleImageChange(e);

                          }
                        }}
                      />
                    )}
                  />
                </Label>
              )
            }

            {errorFieldImage && (
              <span className="text-red-500 mb-3">{errorFieldImage}</span>
            )}
            <div className='flex w-full items-center justify-between gap-5'>
              <div className='w-full'>
                <Label className='text-gray-500'>Nome</Label>
                <Input type='text' {...register('name')} />
                {errors.name && (
                  <span className="text-red-500 mb-3">{errors.name?.message}</span>
                )}
              </div>


            </div>
            <div className='flex w-full items-center justify-between gap-5'>
              <div className='w-full'>
                <Label className='text-gray-500'>Preco</Label>
                <Input type='text' {...register('price')} placeholder='Ex. 00.00' />
                {errors.price && (
                  <span className="text-red-500 mb-3">{errors.price?.message}</span>
                )}
              </div>
              <div className='w-full'>
                <Label className='text-gray-500'>Categoria</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <ReactSelect
                      value={field.value}
                      onChange={(e) => {
                        setSelectCategory(e?.label)
                        field.onChange(e)
                      }}
                      className='w-full'
                      options={[
                        { value: 'Pizza', label: 'Pizza' },
                        { value: 'Bebida', label: 'Bebida' },
                      ]}
                    />

                  )}
                />
              </div>

            </div>
            <div className='flex w-full items-center justify-between gap-5'>

              <div className='w-full'>
                <Label className='text-gray-500'>Tipo de pizza</Label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <ReactSelect
                      isDisabled={selectCategory === 'Bebida' ? true : false}
                      value={field.value}
                      onChange={field.onChange}
                      className='w-full'
                      options={[
                        { value: 'Especial', label: 'Especial' },
                        { value: 'Tradicional', label: 'tradicional' },
                      ]}
                    />

                  )}
                />
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
            <Label className='text-gray-500'>Descricao</Label>
            <Textarea {...register('description')} maxLength={100} minLength={5} />
            {errors.description && (
              <span className="text-red-500 mb-3">{errors.description?.message}</span>
            )}
            <Button className='w-full mt-4 bg-red-500 hover:bg-red-400' type='submit'>
              Cadastrar
            </Button>
          </form>
          <ToastContainer />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}



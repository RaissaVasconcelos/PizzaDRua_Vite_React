
import { Controller, useForm } from 'react-hook-form'
import logo from '../../assets/logo.png'
import { z } from 'zod'
import InputMask from 'react-input-mask';
import { zodResolver } from '@hookform/resolvers/zod'
// import { api } from '@/services/api'
import { AxiosError } from 'axios'
import { NavLink } from 'react-router-dom';



const createCustomerFormSchema = z.object({
    name: z
        .string()
        .nonempty('O nome e obrigatorio!')
        .min(3, 'O nome deve ter no minimo 3 caracteres'),
    email: z
        .string()
        .nonempty('O e-mail e obrigatorio!')
        .email('Formato de e-mail inválido!'),
    password: z
        .string()
        .nonempty('O password e obrigatorio!')
        .min(6, 'A senha deve ter no minimo 6 caracteres'),
    phone: z
        .string()
        .nonempty('O campo telefone é obrigatório')
        .refine((value) => /^\(\d{2}\) \d{5}-\d{4}$/.test(value), {
            message: 'Número de telefone inválido',
        }),
})

type CreateCustomerFormData = z.infer<typeof createCustomerFormSchema>

export default function Page() {
    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<CreateCustomerFormData>({
        resolver: zodResolver(createCustomerFormSchema),
    })

    const handleCreateCustomer = async (data: CreateCustomerFormData) => {
        try {
            // await api.post('/customer', data)

            // router.push('/')
        } catch (error: unknown) {
            const customError = error as AxiosError

            if (customError.response?.status === 400) {
                setError('root', {
                    type: 'manual',
                    message: 'Usuário já cadastrado',
                })
            } else {
                console.error(customError)
            }
        }
    }


    return (
        <main className='mt-32 flex items-center justify-center'>
            <form
                onSubmit={handleSubmit(handleCreateCustomer)}
                className="bg-white w-11/12 flex flex-col items-center justify-between py-2 rounded-xl"
            >
                <div className='w-10/12 mb-4 flex items-center justify-start'>
                    <img src={logo} width={100} height={100} alt='' />
                    <h1 className='text-xl'><span className='font-bold'>Pizza</span>D'Rua</h1>
                </div>
                <div className="w-9/12 text-gray-600 mb-8 ">
                    <h2 className="text-2xl font-bold">Crie sua conta</h2>
                    <p>Continua para PizzaDRua</p>
                </div>
                <input
                    {...register('name')}
                    className="w-10/12 p-4 mb-4 rounded  border border-gray-400 text-sm text-gray-500 placeholder:text-gray-500"
                    type="text"
                    placeholder="Digite seu nome"
                />
                {errors.name && (
                    <span className="text-red-500 mb-3">{errors.name?.message}</span>
                )}
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <InputMask
                            className='w-10/12 p-4 mb-4 rounded  border border-gray-400 text-sm text-gray-500 placeholder:text-gray-500'
                            mask="(99) 99999-9999"
                            maskPlaceholder=""
                            onChange={field.onChange}
                            placeholder="(00) 00000-0000"
                            value={field.value}
                        />
                    )}
                />
                {errors.phone && <p className='text-red-500 mb-3'>{errors.phone.message}</p>}
                <input
                    {...register('email')}
                    className="w-10/12 p-4 mb-4 rounded  border border-gray-400 text-sm text-gray-500 placeholder:text-gray-500"
                    type="text"
                    placeholder="Digite seu E-mail"
                />
                {errors.email && (
                    <span className="text-red-500 mb-3">{errors.email?.message}</span>
                )}
                <input
                    {...register('password')}
                    className=" p-4 w-10/12 rounded  border border-gray-400 text-sm text-gray-500 placeholder:text-gray-500"
                    type="text"
                    placeholder="Digite sua senha"
                />
                {errors.password && (
                    <span className="text-red-500 mt-3">
                        {errors.password?.message}
                    </span>
                )}
                <button
                    className="bg-orange-500 w-10/12 mt-8  py-4 rounded text-gray-200 font-bold text-sm  uppercase hover:bg-orange-600"
                    type="submit"
                >
                    Cadastrar
                </button>
                <NavLink
                    to="/sign-in"
                    className="text-gray-500 text-center mt-2"
                >
                    <p className="mt-4">
                        Ja possui conta?{' '}
                        <strong className="text-orange-400">Entar!</strong>{' '}
                    </p>
                </NavLink>
            </form>
        </main>
    )
}
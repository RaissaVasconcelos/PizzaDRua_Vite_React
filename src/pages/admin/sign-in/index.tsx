import { useForm } from 'react-hook-form'
import logo from '../../../assets/logo.png'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import ServiceAuthenticate from '../../../infrastructure/services/customer'
import { setCookie } from 'nookies'


const createCustomerFormSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail e obrigatorio!')
    .email('Formato de e-mail inválido!'),
  password: z
    .string()
    .nonempty('O password e obrigatorio!')
    .min(6, 'A senha deve ter no minimo 6 caracteres'),
})

type CreateCustomerFormData = z.infer<typeof createCustomerFormSchema>

export default function SignInDashboard() {
  const customer = new ServiceAuthenticate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerFormSchema),
  })

  const navigate = useNavigate()

  const handleSignIn = async (data: CreateCustomerFormData) => {

    const response = await customer.authentication(data)
    if (response.statusCode === 401) {
      setError('email', {
        type: 'manual',
        message: 'Email ou senha inválidos',
      })
      setError('password', {
        type: 'manual',
        message: 'Email ou senha inválidos',
      })
    }else{
      const { access_token } = response.body as any
      setCookie(undefined, 'token', access_token)
    }

      navigate('/admin/dashboard')
  }


  return (
    <div className='mt-40 w-7/12 flex items-center justify-center '>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="bg-white w-11/12 text-gray-600 flex flex-col items-center justify-between py-4 rounded-xl "
      >
        <div className='w-10/12 mb-4 flex items-center justify-start'>
          <img src={logo} width={100} height={100} alt='' />
          <h1 className='text-xl'><span className='font-bold'>Pizza</span>D'Rua</h1>
        </div>
        <div className="w-9/12 text-gray-600 mb-8 ">
          <h2 className="text-2xl font-bold">Entrar</h2>
        </div>
        <input
          {...register('email')}
          className="w-10/12 p-4 mb-4 rounded  border border-gray-400 text-sm text-gray-600 placeholder:text-gray-500"
          type="text"
          placeholder="Digite seu E-mail"
        />
        {errors.email && (
          <span className="text-red-500 mb-3">{errors.email?.message}</span>
        )}
        <input
          {...register('password')}
          className=" p-4 w-10/12 rounded  border border-gray-400 text-sm text-gray-600 placeholder:text-gray-500"
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
          Entrar
        </button>

      </form>
    </div>
  )
}
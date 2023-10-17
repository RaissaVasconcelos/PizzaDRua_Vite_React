import { useForm } from 'react-hook-form'
import logo from '../../assets/logo.png'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { NavLink } from 'react-router-dom'
import { api } from '../../utils/axios'
import { setCookie } from 'nookies'
import { useNavigate } from 'react-router-dom'

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

export default function SignIn() {

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
    try {

      const response = await api.post('/sessions', data)
      const { access_token } = response.data
      setCookie(undefined, 'accessToken', access_token, {
        maxAge: 60 * 60 * 24, // 1 days
      })

      navigate('/')
    } catch (error: unknown) {
      const customError = error as AxiosError
      if (customError.response?.status === 401) {
        setError('email', {
          type: 'manual',
          message: 'Email ou senha inválidos',
        })
        setError('password', {
          type: 'manual',
          message: 'Email ou senha inválidos',
        })
      } else {
        console.error(customError)
      }
    }
  }


  return (
    <div className='mt-40 w-11/12 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="bg-white w-11/12 text-gray-600 flex flex-col items-center justify-between py-2 rounded-xl"
      >
        <div className='w-10/12 mb-4 flex items-center justify-start'>
          <img src={logo} width={100} height={100} alt='' />
          <h1 className='text-xl'><span className='font-bold'>Pizza</span>D'Rua</h1>
        </div>
        <div className="w-9/12 text-gray-600 mb-8 ">
          <h2 className="text-2xl font-bold">Entrar</h2>
          <p>Continua para PizzaDRua</p>
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
        <NavLink
          to="/sign-up"
          className="text-gray-500 text-center mt-2"
        >
          <p className="mt-4">
            Ainda não tem conta?{' '}
            <strong className="text-orange-400">Criar conta!</strong>{' '}
          </p>
        </NavLink>
      </form>
    </div>
  )
}
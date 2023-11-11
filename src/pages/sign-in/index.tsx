import { useForm } from 'react-hook-form'
import logo from '../../assets/logo.png'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { NavLink } from 'react-router-dom'
import { api } from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import google from '../../assets/google.svg'
import { ContextApp } from '../../context/context-app'
import { ToastContainer } from 'react-toastify'
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

export default function SignIn() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerFormSchema),
  })
  const { handleSignInGoogle, isAuthenticated, customer } = ContextApp()

  const navigate = useNavigate()

  const handleSignIn = async (data: CreateCustomerFormData) => {

    const auth = getAuth()
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Signed in 
        if (!user.emailVerified) {
          setError('root', {
            type: 'manual',
            message: 'Email não verificado',
          })
          return
        }
        user.getIdToken().then((token) => {
          setCookie(undefined, 'accessToken', JSON.stringify(token))
        })
        setCookie(undefined, 'customer', JSON.stringify(user))

        navigate('/')
        window.location.reload()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);

        if (errorCode === 'auth/invalid-login-credentials') {
          setError('email', {
            type: 'manual',
            message: 'Email ou senha inválidos',
          })
          setError('password', {
            type: 'manual',
            message: 'Email ou senha inválidos',
          })
        } else {
          console.error(errorMessage)
        }
      });

  }

  if (isAuthenticated) {
    const handleCreateCustomerSocialAccount = async () => {
      if (customer) {
        await api.post('/sessions/social-login',
          {
            id: customer.uid,
            name: customer.displayName,
            email: customer.email,
          })
      }
    }
    handleCreateCustomerSocialAccount()
    navigate('/')
    
  }
  return (
    <div className='mt-40 bg-white w-10/12 flex flex-col items-center justify-center'>
      <div className='w-10/12 mb-4 flex items-center justify-start'>
        <img src={logo} width={100} height={100} alt='' />
        <h1 className='text-xl'><span className='font-bold'>Pizza</span>D'Rua</h1>
      </div>
      <div className="w-10/12 text-gray-600 mb-8 ">
        <h2 className="text-2xl font-bold">Entrar</h2>
        <p>Continua para PizzaDRua</p>
        <button onClick={() => { handleSignInGoogle() }} className='border-[1px] mt-3 gap-2 flex items-center justify-center border-gray-400 rounded p-2 w-full'>
          <img src={google} className='w-6' alt="logo do google" />
          Continuar com o Google
        </button>
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className=" w-full text-gray-600 flex flex-col items-center justify-between py-2 rounded-xl"
      >

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
        {errors.root && (
          <span className="text-red-500 mt-3">
            {errors.root?.message}
          </span>
        )}
        <button
          className="bg-orange-500 w-10/12 mt-8  py-2 rounded text-gray-100 font-semibold  hover:bg-orange-600"
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
        <ToastContainer />
      </form>
    </div>
  )
}
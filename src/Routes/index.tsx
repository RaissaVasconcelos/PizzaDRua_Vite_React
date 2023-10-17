import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/cart'
import Personalize from '../pages/personalize'
import Address from '../pages/address'
import CreateAddress from '../pages/address/create-address'
import SignIn from '../pages/sign-in'
import SignUp from '../pages/sign-up'
import Payment from '../pages/payment'
import Checkout from '../pages/checkout'
import Pix from '../pages/pix'
import Success from '../pages/success'
import Tracking from '../pages/tracking'
import MethodDelivery from '../pages/delivery/delivery-method-page'
import ProtectedRoute from './ProtectedRoute'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/dashboard'
import SignInDashboard from '../pages/admin/sign-in'
import Neighborhoods from '../pages/admin/neighborhoods'
import Products from '../pages/admin/products'

export const Router = () => {

  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />} >

        //rotas públicas que não requerem autenticação
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        //Rotas protegidas que requerem autenticação
        <Route path='/payment' element={<Payment />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/personalize' element={<Personalize />} />
        <Route path='/address' element={<Address />} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/create-address' element={<CreateAddress />} />
        <Route path='/pix' element={<Pix />} />
        <Route path='/success' element={<Success />} />
        <Route path='/tracking' element={<Tracking />} />
        <Route path='/delivery' element={<MethodDelivery />} />
      </Route>

      //Rotas admin
      <Route path='/' element={<AdminLayout />}>
        <Route path='/admin/sign-in' element={<SignInDashboard/>} />
        <Route path='/admin/dashboard' element={<Dashboard />} /> 
        <Route path='/admin/neighborhoods' element={<Neighborhoods />} />
        <Route path='/admin/products' element={<Products />} />
      </Route>
    </Routes>
  )
}
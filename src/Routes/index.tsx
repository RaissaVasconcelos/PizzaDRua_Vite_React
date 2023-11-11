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
import OrdersCustomer from '../pages/orders'
import OrdersHistory from '../pages/admin/orders-history'

export const Router = () => {

  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />} >

        //rotas públicas que não requerem autenticação
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/personalize' element={<Personalize />} />
        <Route path='/cart' element={<Cart />} />

        //Rotas protegidas que requerem autenticação
        <Route path='/payment' element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path='/address' element={<ProtectedRoute><Address /></ProtectedRoute>} />
        <Route path='/create-address' element={<ProtectedRoute><CreateAddress /></ProtectedRoute>} />
        <Route path='/pix' element={<ProtectedRoute><Pix /></ProtectedRoute>} />
        <Route path='/success' element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path='/tracking/:id' element={<ProtectedRoute><Tracking /></ProtectedRoute>} />
        <Route path='/delivery' element={<ProtectedRoute><MethodDelivery /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><OrdersCustomer /></ProtectedRoute>} />
      </Route>

      //Rotas admin
      <Route path='/' element={<AdminLayout />}>
      
        <Route path='/admin/sign-in' element={<SignInDashboard />} />
        <Route path='/admin/orders-history' element={<OrdersHistory />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/neighborhoods' element={<Neighborhoods />} />
        <Route path='/admin/products' element={<Products />} />
      </Route>
    </Routes>
  )
}
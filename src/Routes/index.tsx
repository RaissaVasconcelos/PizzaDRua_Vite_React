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

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/personalize' element={<Personalize />} />
      <Route path='/address' element={<Address />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/create-address' element={<CreateAddress />} />
      <Route path='/pix' element={<Pix />} />
      <Route path='/success' element={<Success />} />
      <Route path='/tracking' element={<Tracking />} />
    </Routes>
  )
}
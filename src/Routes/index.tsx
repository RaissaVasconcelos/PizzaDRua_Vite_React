import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import CartPage from '../pages/cart'
import Personalize from '../pages/personalize'
import Address from '../pages/address'
import CreateAddress from '../pages/address/create-address'



export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/personalize' element={<Personalize />} />
            <Route path='/address' element={<Address />} />
            <Route path='/create-address' element={<CreateAddress />} />            
        </Routes>
    )
}
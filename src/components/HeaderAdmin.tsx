import { NavLink } from "react-router-dom"

export const HeaderAdmin = () => {

  return (
    <header className='w-full bg-orange-500 flex flex-col items-start justify-center h-40'>
      <nav className='w-full my-5 text-gray-100 text-lg font-medium flex items-center justify-center gap-10'>
        <NavLink to="/admin/dashboard">Pedidos</NavLink>
        <NavLink to="/admin/products">Produtos</NavLink>
        <NavLink to="/admin/neighborhoods">Bairros</NavLink>
        <NavLink to="/admin/orders-history">Histórico de Pedidos</NavLink>
      </nav>
    </header>
  )
}
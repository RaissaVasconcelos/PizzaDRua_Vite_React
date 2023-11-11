import { NavLink } from "react-router-dom"

export const HeaderAdmin = () => {

  return (
    <div className='bg-orange-500 flex flex-col items-start justify-center'>
      <header className=" h-36 flex items-center justify-between py-4 px-8  text-slate-100">
        <div className="flex flex-col items-start justify-center gap-1">
          <h1 className="text-2xl text-gray-100 font-semibold">Pedidos</h1>
          <p>Acompanhe os pedidos dos clientes</p>
        </div>
    </header>
        <nav className='w-full my-5 text-gray-100 text-lg font-medium flex items-center justify-center gap-10'>
          <NavLink to="/admin/dashboard">Pedidos</NavLink>        
          <NavLink to="/admin/products">Produtos</NavLink>
          <NavLink to="/admin/neighborhoods">Bairros</NavLink>
          <NavLink to="/admin/orders-history">Histórico de Pedidos</NavLink>
        </nav>
    </div>
  )
}
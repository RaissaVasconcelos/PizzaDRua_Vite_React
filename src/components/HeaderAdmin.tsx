
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
          <a href="/admin/dashboard">Pedidos</a>        
          <a href="/admin/products">Produtos</a>
          <a href="/admin/neighborhoods">Bairros</a>
        </nav>
    </div>
  )
}
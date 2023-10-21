import { ContextApp } from "../../../context/context-app"
import { GlassWater, Pizza }from 'lucide-react'

export const Navigate = () => {
  const { onChangeCatalog, setOnChangeCatalog } = ContextApp()

  return (
    <nav className="flex items-center scrollbar justify-center gap-6 mt-8 w-full text-orange-500">
      <button
        data-active={onChangeCatalog == "PIZZA"}
        className='flex group items-center justify-center gap-2 py-1 pr-3 pl-1 text-lg font-medium rounded-3xl border-2 border-orange-500 bg-white text-orange-500  data-[active=true]:bg-orange-500 data-[active=true]:text-white'
        onClick={() => setOnChangeCatalog('PIZZA')}   
      >
        <div className="flex items-center border-1 justify-center rounded-full p-2 relative right-0  text-white bg-orange-500 group-data-[active=true]:bg-white group-data-[active=true]:text-orange-500">
          <Pizza />
        </div>
        Pizza's
      </button>

      <button
        data-active={onChangeCatalog == "DRINK"}
        className='flex group items-center justify-center gap-2 py-1 pr-3 pl-1 text-lg font-medium rounded-3xl border-2 border-orange-500 bg-white text-orange-500  data-[active=true]:bg-orange-500 data-[active=true]:text-white'
        onClick={() => setOnChangeCatalog('DRINK')}   
      >
        <div className="flex items-center border-1 justify-center rounded-full p-2 relative right-0  text-white bg-orange-500 group-data-[active=true]:bg-white group-data-[active=true]:text-orange-500">
          <GlassWater />
        </div>
        Bebidas
      </button>
    </nav>
  )
}

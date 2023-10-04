import { ContextApp } from "../../../context/context-app"
import pizza from '../../../assets/pizza.png'
import drink from '../../../assets/drink.png'

export const Navigate = () => {
  const { onChangeCatalog, setonChangeCatalog } = ContextApp()

  return (
    <nav className="flex items-center justify-center gap-10 mt-10 w-full text-orange-500">
      <div onClick={() => setonChangeCatalog('PIZZA')} className={`${onChangeCatalog === 'PIZZA' ? 'bg-orange-100' : 'bg-white'} p-4 rounded-full hover:bg-orange-100`}>
        <img src={pizza} className="w-10" alt="" />
      </div>
      <div onClick={() => setonChangeCatalog('DRINK')} className={`${onChangeCatalog === 'DRINK' ? 'bg-orange-100' : 'bg-white'} p-4 rounded-full hover:bg-orange-100`}>
        <img src={drink} className="w-10" alt="" />
      </div>
    </nav>
  )
}

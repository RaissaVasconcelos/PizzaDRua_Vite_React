import { Beer, Pizza } from "lucide-react"
import { ContextApp } from "../../../context/context-app"


export const Navigate = () => {
    const { onChangeCatalog, setonChangeCatalog } = ContextApp()

    return (
        <nav className="flex items-center justify-center gap-10 mt-10 w-full text-orange-500">
            <div onClick={() => setonChangeCatalog('PIZZA')} className={`${onChangeCatalog === 'PIZZA' ? 'bg-orange-100' : 'bg-white'} p-6 rounded-full hover:bg-orange-100`}>
                <Pizza size={28} />
            </div>
            <div onClick={() => setonChangeCatalog('DRINK')} className={`${onChangeCatalog === 'DRINK' ? 'bg-orange-100' : 'bg-white'} p-6 rounded-full hover:bg-orange-100`}>
                <Beer size={28} />
            </div>
        </nav>
    )
}

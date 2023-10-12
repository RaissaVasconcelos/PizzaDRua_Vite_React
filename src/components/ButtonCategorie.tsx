import { LucideIcon } from 'lucide-react'

interface ButtonProps {
  title: string,
  onChangeCatalog: string,
  active: boolean,
  onClick: () => void,
  setOnChangeCatalog: (catalog: string) => void,
  icon: LucideIcon
}

export default function ButtonCategorie({ title, onChangeCatalog, active, setOnChangeCatalog, icon: Icon }: ButtonProps) {
  return (
    <button
      data-active={active}
      className='flex group items-center justify-center gap-2 py-1 pr-3 pl-1 text-lg font-medium rounded-3xl border-2 border-orange-500 bg-white text-orange-500  data-[active=true]:bg-orange-500 data-[active=true]:text-white'   
    >
      <div className="flex items-center border-1 justify-center rounded-full p-2 relative right-0  text-white bg-orange-500 group-data-[active=true]:bg-white group-data-[active=true]:text-orange-500">
        <Icon /> 
      </div>
      {title}
    </button>
  )
}

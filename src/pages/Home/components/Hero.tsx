// import logo from '../../../assets/logo.png'
import promo from '../../../assets/quinta-promo.png'

export const Hero = () => {
    return (
        <main className='mt-5 flex flex-col items-center justify-around w-full'>
            {/* <div className='w-11/12 flex  items-center justify-between'>
                <div>
                    <h3 className='text-sm'>Bem-Vindo(a) a</h3>
                    <h2 className='font-bold text-2xl'>Pizza<span className='font-light'>D'RUA</span></h2>
                </div>
                <img src={logo} alt="logo" />
            </div> */}
                <img src={promo} alt="promocao" />
        </main>
    )
}
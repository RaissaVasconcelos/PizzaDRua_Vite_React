import logo from '../../../assets/logo.png'


export const Hero = () => {
    return (
        <main className='mt-10 flex items-center justify-around w-full'>
            <div>
                <h3 className='text-sm'>Bem-Vindo(a) a</h3>
                <h2 className='font-bold text-2xl'>Pizza<span className='font-light'>D'RUA</span></h2>
            </div>
            <img src={logo} alt="logo" />
        </main>
    )
}
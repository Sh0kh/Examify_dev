import { NavLink } from 'react-router-dom';
import Bg from '../images/Cardbg.png';
import logo from '../images/Examify_Dark.jpg';


export default function MultiLevel() {
    return (
        <section className='Test pt-[100px] pb-[200px]'>
            <div className='Container'>
                <h1 className='text-MainColor font-bold text-[55px] cursor-pointer transition-all duration-700 hover:tracking-widest'>
                    Multi Level
                </h1>
                <div className='Test__wrapper'>
                    <div className='flex flex-col items-center'>
                        <NavLink to={'/multi-level/exam'}>
                            <div
                                className='Test__card flex flex-col h-[400px] cursor-pointer p-[20px] bg-MainColor rounded-[8px] transition duration-500 hover:shadow-xl'>
                                <img src={logo} className='w-[100px] cursor-pointer' alt="" />
                                <h2 className='text-[white] text-[50px] mt-[30px] h-[60px]'>
                                    Multi level
                                </h2>
                                <img className='TestCard1 block mt-[30px]' src={Bg} alt="foto" />
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}
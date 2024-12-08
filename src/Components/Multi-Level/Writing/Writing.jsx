import React, { useState } from 'react';
import Part1 from './Part1.jsx';
import Part2 from './Part2';


import { useDispatch } from 'react-redux';
import { setComponent } from '../../../Redux/ComponentSlice';
import { useNavigate } from 'react-router-dom';


function Writing() {
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const dispatch = useDispatch();



    const out = () => {
        navigate(-1);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const parts = [
        { id: 1, component: <Part1 /> },
        { id: 2, component: <Part2 /> },
    ];




    const handleNext = () => {
        dispatch(setComponent('SPEAKING'));

    };



    return (
        <div className='Reading'>
            <div className='Book__header p-[10px] bg-[#b4b0b08c]'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[red]'>Writing exam</h2>
                    <div className='flex items-center gap-[10px]'>
                        <button onClick={out} className='bg-[red] px-[20px] font-bold py-[7px] rounded-[8px] text-[white] transition duration-500 border-[2px] border-[red] hover:bg-transparent hover:text-[red]'>
                            Leave exam
                        </button>
                        <button
                            onClick={handleNext}
                            className='bg-green-500 px-[20px] font-bold py-[7px] rounded-[8px] text-[white] transition duration-500 border-[2px] border-green-500 hover:bg-transparent hover:text-green-500'
                        >
                            Next exam
                        </button>
                    </div>
                </div>
            </div>
            <div className='p-[10px]'>
                <div className='flex items-center gap-[3px] mt-[30px]'>
                    {parts.map(part => (
                        <button
                            key={part.id}
                            onClick={() => {
                                setActive(part.id);
                            }}
                            className={`border-[1px] border-[#D6D4D4] px-[10px] py-[7px] font-bold bg-[#ababab83] ${active === part.id ? 'bg-transparent' : ''}`}
                        >
                            Part {part.id}
                        </button>
                    ))}
                </div>
                <div>
                    {parts.find(part => part.id === active)?.component}
                </div>
            </div>
        </div>
    );
}

export default Writing;

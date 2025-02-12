import React, { useEffect, useState } from 'react';
import Part1 from './Part1.jsx';
import Part2 from './Part2';


import { useDispatch } from 'react-redux';
import { setComponent } from '../../../Redux/ComponentSlice';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { axiosAPI2 } from '../../../Service/axios.js';
import { setNextSection } from '../../../Redux/NextSection.js';
// import { setNextSection } from '../../../Redux/NextSection.js';


function Writing() {
    const { ID } = useParams()
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(null);
    const [Part1Answer, setPart1Answer] = useState([]);
    // const [Part2Answer, setPart2Answer] = useState([]);
    const [part1Text, setPart1Text] = useState('');




    const NextSection = useSelector((state) => state.exam.NextSection);
    useEffect(() => {
        if (NextSection?.next_section?.duration) {
            setTimeLeft(NextSection.next_section.duration * 60);
        }
    }, [NextSection]);

    useEffect(() => {
        if (timeLeft !== null) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft]);
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };




    console.log(NextSection?.next_section)


    const handleAnswerSelect = (question_id, answer_id, value = null, partType) => {
        if (partType === "part2") {
            setPart1Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, { question_id, answer_id, question_type: "select" }];
            });
        }
    }



    const handleTextChange = (text) => {
        setPart1Text(text);
    };

    const out = () => {
        navigate(-1);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const parts = [
        {
            id: 1,
            component: <Part1
                data={NextSection?.next_section?.parts[0]}
                onTextChange={handleTextChange}
            />
        },
        { id: 2, component: <Part2 /> },
    ];


    const checkPart = async () => {
        try {
            const payload = {
                section_id: NextSection?.next_section?.id,
                exam_id: ID,
                parts: [
                    {
                        id: NextSection?.next_section?.parts[0]?.id,
                        part_type: "reading",
                        answers: Part1Answer
                    },
                ],
            };
            const response = await axiosAPI2.post(`/user/check`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(setNextSection(response.data));
            dispatch(setComponent('SPEAKING'));
        } catch (error) {
            console.error("Ошибка при отправке ответов", error);
        }
    };



    return (
        <div className='Reading'>
            <div className='Book__header p-[10px] bg-[#b4b0b08c]'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[red]'>Writing exam</h2>
                    <h2>{formatTime(timeLeft)}</h2>
                    <div className='flex items-center gap-[10px]'>
                        <button onClick={out} className='bg-[red] px-[20px] font-bold py-[7px] rounded-[8px] text-[white] transition duration-500 border-[2px] border-[red] hover:bg-transparent hover:text-[red]'>
                            Leave exam
                        </button>
                        <button
                            onClick={checkPart}
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

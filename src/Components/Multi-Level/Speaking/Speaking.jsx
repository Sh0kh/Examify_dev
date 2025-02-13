import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Part1 from './Part1/Part1.jsx';
import Part2 from './Part2/Part2.jsx';
import Part3 from './Part3/Part3.jsx';
import { axiosAPI2 } from '../../../Service/axios.js';

function Speaking() {
    const { ID } = useParams();
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const [timeLeft, setTimeLeft] = useState(null);
    const [part1Answer, setPart1Answer] = useState([]);
    const [part2Answer, setPart2Answer] = useState([]);
    const [part3Answer, setPart3Answer] = useState([]);
    const [part4Answer, setPart4Answer] = useState([]);

    const nextSection = useSelector((state) => state.exam.NextSection);

    useEffect(() => {
        if (nextSection?.next_section?.duration) {
            setTimeLeft(nextSection.next_section.duration * 60);
        }
    }, [nextSection]);

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

    const out = () => {
        navigate(-1);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const parts = [
        {
            id: 1,
            component: (
                <Part1
                    data={nextSection?.next_section?.parts}
                    onResponse={(response) => {
                        setPart1Answer((prev) => [...prev, response]);
                    }}
                    onRespons2={(response) => {
                        setPart2Answer((prev) => [...prev, response]);
                    }}
                />
            )
        },
        {
            id: 2, component: <Part2
                data={nextSection?.next_section?.parts[2]}
                onResponse={(response) => {
                    setPart3Answer((prev) => [...prev, response]);
                }}
            />
        },
        {
            id: 3, component: <Part3
                data={nextSection?.next_section?.parts[3]}
                onResponse={(response) => {
                    setPart4Answer((prev) => [...prev, response]);
                }}
            />
        }
    ];

    const checkPart = async () => {
        try {
            const payload = {
                section_id: nextSection?.next_section?.id,
                exam_id: ID,
                parts: [
                    {
                        id: nextSection?.next_section?.parts[0]?.id,
                        part_type: "speaking",
                        answers: part1Answer
                    },
                    {
                        id: nextSection?.next_section?.parts[1]?.id,
                        part_type: "speaking",
                        answers: part2Answer
                    },
                    {
                        id: nextSection?.next_section?.parts[2]?.id,
                        part_type: "speaking",
                        answers: part3Answer
                    },
                    {
                        id: nextSection?.next_section?.parts[3]?.id,
                        part_type: "speaking",
                        answers: part4Answer
                    }
                ]
            };

            await axiosAPI2.post('/user/check', payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error("Ошибка при отправке ответов", error);
        }
    };

    return (
        <div className="Speaking">
            <div className="Book__header p-[10px] bg-[#b4b0b08c]">
                <div className="flex items-center justify-between">
                    <h2 className="text-[red]">Speaking exam</h2>
                    <h2>{formatTime(timeLeft)}</h2>
                    <div className="flex items-center gap-[10px]">
                        <button
                            onClick={out}
                            className="bg-[red] px-[20px] font-bold py-[7px] rounded-[8px] text-[white] transition duration-500 border-[2px] border-[red] hover:bg-transparent hover:text-[red]"
                        >
                            Leave exam
                        </button>
                        <button
                            onClick={checkPart}
                            className="bg-green-500 px-[20px] font-bold py-[7px] rounded-[8px] text-[white] transition duration-500 border-[2px] border-green-500 hover:bg-transparent hover:text-green-500"
                        >
                            Next exam
                        </button>
                    </div>
                </div>
            </div>
            <div className="Container">
                <div className="flex items-center gap-[3px] mt-[30px]">
                    {parts.map(part => (
                        <button
                            key={part.id}
                            onClick={() => setActive(part.id)}
                            className={`border-[1px] border-[#D6D4D4] px-[10px] py-[7px] font-bold ${active === part.id ? 'bg-transparent' : 'bg-[#ababab83]'
                                }`}
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

export default Speaking;
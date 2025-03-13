import React, { useEffect, useState, } from 'react';
import Part1 from './Part1';
import Part2 from './Part2';
import Part3 from './Part3';

import { useDispatch } from 'react-redux';
import { setComponent } from '../../../Redux/ComponentSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Part4 from './Part4';
import Part5 from './Part5';
import { useSelector } from 'react-redux';
import { setNextSection } from '../../../Redux/NextSection.js';
import { axiosAPI2 } from '../../../Service/axios';

function Reading() {
    const { ID } = useParams()
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const dispatch = useDispatch();
    const NextSection = useSelector((state) => state.exam.NextSection);
    const [Part1Answer, setPart1Answer] = useState([]);
    const [Part2Answer, setPart2Answer] = useState([]);
    const [Part3Answer, setPart3Answer] = useState([]);
    const [Part4Answer, setPart4Answer] = useState([]);
    const [Part5Answer, setPart5Answer] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [loading, setLoading] = useState(false)

    const [selectedAnswers, setSelectedAnswers] = useState({});



    // console.log(NextSection?.next_section)

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


    const handleAnswerSelect = (question_id, answer_id, value = null, partType, question_type = "quiz") => {
        setSelectedAnswers(prev => ({ ...prev, [question_id]: answer_id || value }));

        if (partType === "part1") {
            setPart1Answer(value);
        } else if (partType === "part2") {
            setPart2Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, { question_id, answer_id, question_type: "select" }];
            });
        } else if (partType === "part3") {
            setPart3Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, { question_id, answer_id, question_type: "select" }];
            });
        } else if (partType === "part4") {
            setPart4Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, { question_id, answer_id, question_type: "quiz" }];
            });
        } else if (partType === "part5") {
            setPart5Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                if (question_type === "quiz") {
                    return [...updatedAnswers, { question_id, answer_id, question_type: "quiz" }];
                } else if (question_type === "writing") {
                    return [...updatedAnswers, { question_id, answer_text: value, question_type: "writing", answer_id: null }];
                }
                return updatedAnswers;
            });
        }
    };


    const out = () => {
        navigate(-1);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const checkPart = async () => {
        setLoading(true)
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
                    {
                        id: NextSection?.next_section?.parts[1]?.id,
                        part_type: "reading",
                        answers: Part2Answer
                    },
                    {
                        id: NextSection?.next_section?.parts[2]?.id,
                        part_type: "reading",
                        answers: Part3Answer
                    },
                    {
                        id: NextSection?.next_section?.parts[3]?.id,
                        part_type: "reading",
                        answers: Part4Answer
                    },
                    {
                        id: NextSection?.next_section?.parts[4]?.id,
                        part_type: "reading",
                        answers: Part5Answer
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
            dispatch(setComponent('WRITING'));
        } catch (error) {
            console.error("Ошибка при отправке ответов", error);
        } finally {
            setLoading(false)
        }
    };


    const parts = [
        {
            id: 1,
            component: <Part1
                onAnswerSelect={(q, a, v) => handleAnswerSelect(q, a, v, "part1")}
                data={NextSection?.next_section?.parts[0]}
            />
        },
        {
            id: 2,
            component: <Part2
                selectedAnswers={selectedAnswers}
                onAnswerSelect={(q, a, v) => handleAnswerSelect(q, a, v, "part2")}
                data={NextSection?.next_section?.parts[1]}
            />
        },
        {
            id: 3,
            component: <Part3
                selectedAnswers={selectedAnswers}
                onAnswerSelect={(q, a, v) => handleAnswerSelect(q, a, v, "part3")}
                data={NextSection?.next_section?.parts[2]}
            />
        },
        {
            id: 4,
            component: <Part4
                selectedAnswers={selectedAnswers}
                onAnswerSelect={(q, a, v) => handleAnswerSelect(q, a, v, "part4")}
                data={NextSection?.next_section?.parts[3]}
            />
        },
        {
            id: 5,
            component: <Part5
                selectedAnswers={selectedAnswers}
                onAnswerSelect={(q, a, v, type) => handleAnswerSelect(q, a, v, "part5", type)}
                data={NextSection?.next_section?.parts[4]}
            />

        },
    ];







    return (
        <div className='Reading'>
            <div className='Book__header p-[10px] bg-[#b4b0b08c]'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[red]'>Reading exam</h2>
                    <h2>{formatTime(timeLeft)}</h2>
                    <div className='flex items-center gap-[10px]'>
                        <button onClick={out} className='bg-[red] px-[20px] font-bold py-[7px] rounded-[8px] text-[white] transition duration-500 border-[2px] border-[red] hover:bg-transparent hover:text-[red]'>
                            Leave exam
                        </button>
                        <button
                            onClick={checkPart}
                            disabled={loading}
                            className={`bg-green-500 px-[20px] font-bold py-[7px] rounded-[8px] text-white transition duration-500 border-[2px] border-green-500 
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-transparent hover:text-green-500"}
    `}
                        >
                            {loading ? "Loading..." : "Next Exam"}
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
                            <span className='Part__words'>
                                Part
                            </span> {part.id}
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

export default Reading;

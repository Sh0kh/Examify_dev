import React, { useCallback, useState, useEffect } from 'react';
import Part1 from './Part1';
import Part2 from './Part2';
import Part3 from './Part3';
import Part4 from './Part4';
import Part5 from './Part5';
import Part6 from './Part6';
import { useNavigate } from 'react-router-dom';
import { axiosAPI2 } from '../../../Service/axios';
import MultiLevelStartModal from '../MultiLevelStartModal.jsx'
import { useDispatch } from 'react-redux';
import { setComponent } from '../../../Redux/ComponentSlice';


function Listening() {
    const [StartModal, setStartModal] = useState(true);
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const [examData, setExamData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [Part1Answer, setPart1Answer] = useState([]);
    const [Part2Answer, setPart2Answer] = useState([]);
    const [Part3Answer, setPart3Answer] = useState([]);
    const [Part4Answer, setPart4Answer] = useState([])
    const [Part5Answer, setPart5Answer] = useState([])
    const [Part6Answer, setPart6Answer] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const dispatch = useDispatch();



    const handleDataFromChild = useCallback((data) => {
        setExamData(data);
    }, []);

    useEffect(() => {
        if (examData?.section?.duration) {
            setTimeLeft(examData.section.duration * 60);
        }
    }, [examData]);

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

    const handleAnswerSelect = (question_id, answer_id, value = null, partType) => {
        setSelectedAnswers(prev => ({ ...prev, [question_id]: answer_id || value }));

        if (partType === "quiz") {
            setPart1Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, { question_id, answer_id, question_type: "quiz" }];
            });
        } else if (partType === "writing") {
            setPart2Answer(value);
        } else if (partType === "select") {
            setPart3Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, { question_id, answer_id, question_type: "select" }];
            });
        } else if (partType === "map") {
            setPart4Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, { question_id, answer_id, question_type: "select" }];
            });
        }
        else if (partType === "quiz2") {
            setPart5Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, { question_id, answer_id, question_type: "quiz" }];
            });
        }
        else if (partType === "writing2") {
            setPart6Answer(value);
        }
    };





    const checkPart = async () => {
        try {
            const payload = {
                section_id: examData?.section?.id,
                exam_id: examData?.section?.exam_id,
                parts: [
                    {
                        id: examData?.section?.parts[0]?.id,
                        part_type: "Test shaklida",
                        answers: Part1Answer
                    },
                    {
                        id: examData?.section?.parts[1]?.id,
                        part_type: "Matn yozish shaklida",
                        answers: Part2Answer
                    },
                    {
                        id: examData?.section?.parts[2]?.id,
                        part_type: "Nima haqda gapirganini tanlash shaklida",
                        answers: Part3Answer
                    },
                    {
                        id: examData?.section?.parts[3]?.id,
                        part_type: "Xarita shaklida",
                        answers: Part4Answer
                    },
                    {
                        id: examData?.section?.parts[4]?.id,
                        part_type: "Test shaklida",
                        answers: Part5Answer
                    },
                    {
                        id: examData?.section?.parts[5]?.id,
                        part_type: "Savollarga javob shaklida",
                        answers: Part6Answer
                    },
                ],
            };

            console.log("Отправляем на сервер:", payload);

            await axiosAPI2.post(`/user/check`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(setComponent('READING'));


        } catch (error) {
            console.error("Ошибка при отправке ответов", error);
        }
    };

    const parts = [
        {
            id: 1, component: <Part1
                data={examData?.section?.parts[0]}
                onAnswerSelect={(q, a, v) => handleAnswerSelect(q, a, v, "quiz")}
                selectedAnswers={selectedAnswers}
            />
        },
        {
            id: 2, component: <Part2
                data={examData?.section?.parts[1]}
                onAnswerSelect={(q, a, v) => handleAnswerSelect(q, a, v, "writing")}
            />
        },
        {
            id: 3, component: <Part3
                data={examData?.section?.parts[2]}
                onAnswerSelect={(q, a, v) => handleAnswerSelect(q, a, v, "select")}
                selectedAnswers={selectedAnswers}
            />
        },
        {
            id: 4, component: <Part4
                data={examData?.section?.parts[3]}
                onAnswerSelect={(q, a, v) => handleAnswerSelect(q, a, v, "map")}
                selectedAnswers={selectedAnswers}
            />

        },
        {
            id: 5, component: <Part5
                data={examData?.section?.parts[4]}
                onAnswerSelect={(q, a, v) => handleAnswerSelect(q, a, v, "quiz2")}
                selectedAnswers={selectedAnswers}
            />
        },
        {
            id: 6, component: <Part6
                data={examData?.section?.parts[5]}
                onAnswerSelect={(q, a, v) => handleAnswerSelect(q, a, v, "writing2")}

            />
        },
    ];

    return (
        <div className='Listening'>
            <div className='Book__header p-[10px] bg-[#b4b0b08c]'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[red]'>Listening exam</h2>
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
            <div className='Container'>
                <div className='flex items-center gap-[3px] mt-[30px]'>
                    {parts.map(part => (
                        <button
                            key={part.id}
                            onClick={() => setActive(part.id)}
                            className={`border-[1px] border-[#D6D4D4] px-[10px] py-[7px] font-bold bg-[#ababab83] ${active === part.id ? 'bg-transparent' : ''}`}
                        >
                            <span className='Part__words'>Part</span>
                            {part.id}
                        </button>
                    ))}
                </div>
                <div>{parts.find(part => part.id === active)?.component}</div>
            </div>
            <MultiLevelStartModal isOpen={StartModal} onClose={() => setStartModal(false)} setDataFromChild={handleDataFromChild} />
        </div>
    );
}

export default Listening;

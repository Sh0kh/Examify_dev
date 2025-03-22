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
import { setNextSection } from '../../../Redux/NextSection.js';
import AudioPlayer from './AudioPlay.jsx';


function Listening() {
    const [StartModal, setStartModal] = useState(true);
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const [examData, setExamData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [Part1Answer, setPart1Answer] = useState([]);
    const [Part2Answer, setPart2Answer] = useState([]);
    const [Part3Answer, setPart3Answer] = useState([]);
    const [Part4Answer, setPart4Answer] = useState([]);
    const [Part5Answer, setPart5Answer] = useState([])
    const [Part6Answer, setPart6Answer] = useState([])
    const [loading, setLoading] = useState(false)
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

        const answerObj = {
            question_id,
            answer_id,
            question_type: partType.includes("quiz") ? "quiz" : "select",
            answer_text: ""
        };

        if (partType === "quiz") {
            setPart1Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, answerObj];
            });
        } else if (partType === "writing") {
            setPart2Answer(value || "");
        } else if (partType === "select") {
            setPart3Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, answerObj];
            });
        } else if (partType === "map") {
            setPart4Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, answerObj];
            });
        } else if (partType === "quiz2") {
            setPart5Answer(prev => {
                const updatedAnswers = prev.filter(ans => ans.question_id !== question_id);
                return [...updatedAnswers, answerObj];
            });
        } else if (partType === "writing2") {
            setPart6Answer(value || "");
        }
    };



    const checkPart = async () => {
        setLoading(true)
        try {
            const payload = {
                section_id: examData?.section?.id,
                exam_id: examData?.exam?.id,
                parts: [
                    {
                        id: examData?.section?.parts[0]?.id,
                        part_type: "listening",
                        answers: Part1Answer
                    },
                    {
                        id: examData?.section?.parts[1]?.id,
                        part_type: "listening",
                        answers: Part2Answer
                    },
                    {
                        id: examData?.section?.parts[2]?.id,
                        part_type: "listening",
                        answers: Part3Answer
                    },
                    {
                        id: examData?.section?.parts[3]?.id,
                        part_type: "listening",
                        answers: Part4Answer
                    },
                    {
                        id: examData?.section?.parts[4]?.id,
                        part_type: "listening",
                        answers: Part5Answer
                    },
                    {
                        id: examData?.section?.parts[5]?.id,
                        part_type: "listening",
                        answers: Part6Answer
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
            dispatch(setComponent('READING'));
        } catch (error) {
            console.error("Ошибка при отправке ответов", error);
        } finally {
            setLoading(false)
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
                selectedAnswers={Part2Answer}
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
        <div className='Listening min-h-screen'>
            <div className='Book__header p-[10px] py-[20px] bg-[white] border-b-[1px] border-[#E9EAEB]'>
                <div className='Container'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[black] text-[28px] font-bold'>Listening exam</h2>
                        <h2>{formatTime(timeLeft)}</h2>
                        <div className='flex items-center gap-[10px]'>
                            <button onClick={out} className='bg-[white] text-[16px] shadow-sm px-[50px] font-[600] py-[7px] rounded-[8px] text-[#414651] transition duration-500 border-[1px] border-[#D5D7DA] hover:opacity-[0.5]'>
                                Leave exam
                            </button>
                            <button
                                onClick={checkPart}
                                disabled={loading}
                                className={`bg-[#2970FF] px-[50px] font-bold py-[7px] shadow-sm rounded-[8px] text-white transition duration-500 border-[2px] border-[#2970FF]
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-transparent hover:text-[#2970FF]"}
    `}
                            >
                                {loading ? "Loading..." : "Next Exam"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Container'>
                <div className='flex items-center  mt-[30px]'>
                    {parts.map(part => (
                        <button
                            key={part.id}
                            onClick={() => setActive(part.id)}
                            className={`border-[1px] border-[#F5F5F5] px-[24px] py-[12px] font-bold  ${active === part.id ? 'bg-[#2970FF] text-[white]' : 'bg-[white]'}`}
                        >
                            <span className='Part__words'>Part</span>{' '}
                            {part.id}
                        </button>
                    ))}
                </div>
                <div
                    className='bg-[white] p-[10px] mt-[12px] rounded-[15px] border-[1px] border-[#E9EAEB]'
                >{parts.find(part => part.id === active)?.component}</div>
            </div>
            <MultiLevelStartModal isOpen={StartModal} onClose={() => setStartModal(false)} setDataFromChild={handleDataFromChild} />
            {examData?.section?.audio_path && <AudioPlayer audioPath={examData.section.audio_path} />}
        </div>
    );
}

export default Listening;

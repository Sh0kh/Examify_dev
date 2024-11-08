import React, {useState} from 'react'
import Task1 from './Task1'
import Task2 from './Task2'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate, useParams} from 'react-router-dom';

function Writing() {
    const {ID} = useParams()
    const [answer1, setAnswer1] = useState('')
    const [answer2, setAnswer2] = useState('')
    const navigate = useNavigate()
    const SendUserAnswer = async () => {
        try {
            const userAnswer = {
                Qua: [
                    {
                        question: 'The diagram below shows the floor plan of a public library 20 years ago and how it looks now.',
                        userAnswer: answer1
                    },
                    {
                        question: 'In many countries around the world, rural people are moving to cities, so the population in the countryside is decreasing. Do you think this is a positive or a negative development?',
                        userAnswer: answer2
                    }
                ],
                examId: ID
            }
            await axios.post('/ielts/exam/attempt/create/outline-writing', userAnswer, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            showSuccessToast()
            setTimeout(() => {
                navigate('/myResult')
            }, 3000)
        } catch (error) {
            showErrorToast(error.response?.data?.message)
            if (401 === error.response.data.status) {
                localStorage.clear(); // Очистка localStorage
                navigate('/login'); // Переход на страницу входа
            }
        }
    }


    const showSuccessToast = () => {
        toast.success('Muvaffaqiyatli!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: '#1B2A3D',
                color: 'white'
            }
        });
    };

    const showErrorToast = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: '#1B2A3D',
                color: 'white'
            }
        });
    };


    return (
        <div className='Writing'>
            <div className='Book__header p-[10px] bg-[#b4b0b08c]'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[red]'>Writing exam</h2>
                    <div className='flex items-center gap-[10px]'>
                        <button onClick={SendUserAnswer}
                                className='bg-[red] px-[20px] font-bold py-[7px] rounded-[8px] text-[white] transition duration-500 border-[2px] border-[red] hover:bg-transparent hover:text-[red]'>
                            Finish exam
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-[20px] pb-[50px]'>
                <Task1 setAnswer={setAnswer1} answer={answer1}/>
                <Task2 setAnswer={setAnswer2} answer={answer2}/>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Writing
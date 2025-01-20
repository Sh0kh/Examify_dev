import Bg from '../images/Cardbg.png';
import logo from '../images/Examify_Dark.jpg';
import MultiLevelBuyModal from '../Components/Multi-Level/MultiLevelBuyModal';
import { useEffect, useState } from 'react';
import { axiosAPI2 } from '../Service/axios'
import ReactLoading from 'react-loading';



export default function MultiLevel() {

    const [start, setStart] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [ExamID, setExamID] = useState(null)

    const getAllMultiLevelExam = async () => {
        try {
            const response = await axiosAPI2.get('/user/exams', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            setData(response?.data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllMultiLevelExam()
    }, [])

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <ReactLoading type="spinningBubbles" color="#000" height={100} width={100} />
            </div>
        );
    }

    return (
        <section className='Test pt-[100px] pb-[200px]'>
            <div className='Container'>
                <h1 className='text-MainColor font-bold text-[55px] cursor-pointer transition-all duration-700 hover:tracking-widest'>
                    Multi Level
                </h1>
                {data && data?.length > 0 ? (
                    <div className='Test__wrapper'>
                        {data?.map((i, index) => (
                            <div onClick={()=>setExamID(i?.id)} key={index} className='flex flex-col items-center'>
                                <div
                                    onClick={() => setStart(true)}
                                    className='Test__card flex flex-col h-[400px] cursor-pointer p-[20px] bg-MainColor rounded-[8px] transition duration-500 hover:shadow-xl'>
                                    <img src={logo} className='w-[100px] cursor-pointer' alt="" />
                                    <h2 className='text-[white] text-[50px] mt-[30px] h-[60px]'>
                                        {i?.name}
                                    </h2>
                                    <img className='TestCard1 block mt-[30px]' src={Bg} alt="foto" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='h-screen flex items-center justify-center'>
                        <h1 className='text-MainColor text-[30px]'>
                            Data empty
                        </h1>
                    </div>
                )}
            </div>
            <MultiLevelBuyModal id={ExamID} isOpen={start} onClose={() => setStart(false)} />
        </section>
    )
}
import { useNavigate } from "react-router-dom";
import { axiosAPI2 } from "../../Service/axios";
import Swal from 'sweetalert2'


export default function MultiLevelBuyModal({ isOpen, onClose, id }) {
    // const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


    const navigate = useNavigate()

    const BuyExam = async (type) => {
        try {
            const formData = new FormData();
            formData.append('mock_exam_id', id);
            formData.append('type', type);


            const response = await axiosAPI2.post(`/user/buy-exam`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                    // 'X-CSRF-TOKEN': "tokenvaluetobeinserted235kwgeiOIulgsk",
                },
            });

            navigate(`/multi-level/exam/${response?.data?.exam?.id}`)
            Swal.fire({
                title: 'Muvaffaqiyatli!',
                icon: 'success',
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Error.',
                icon: 'error',
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        }
    };

    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 bg-[#0000006b] z-50 flex items-center justify-center transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
        >
            <div
                className={`TestModal p-[10px] bg-MainColor rounded-[8px] w-[40%] py-[30px] transform transition-all duration-500 ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10'
                    }`}
            >
                <h2 className="text-center text-[white] text-[20px]">What will you choose to have your test checked by AI or Human
                    ?</h2>
                <div className="flex items-center justify-center gap-[30px] mt-[10px]">
                    <button onClick={(e) => BuyExam('ai')} className="bg-[white] p-[10px] rounded-[5px] px-[20px] border-[2px] transition duration-500 hover:bg-transparent hover:text-[white]">
                        AI
                    </button>

                    <button onClick={(e) => BuyExam('human')} className="bg-[white] p-[10px] rounded-[5px] px-[20px] border-[2px] transition duration-500 hover:bg-transparent hover:text-[white]">
                        Human
                    </button>
                </div>
            </div>
        </div>
    )
}
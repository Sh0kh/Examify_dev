import { useParams } from "react-router-dom";
import { axiosAPI2 } from "../../Service/axios";
import Swal from "sweetalert2";

export default function MultiLevelStartModal({ isOpen, onClose, setDataFromChild }) {
    const { ID } = useParams();


    const StartExam = async () => {
        try {
            const formData = new FormData();
            formData.append("exam_id", ID);

            const response = await axiosAPI2.post(`/user/start-exam`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setDataFromChild(response?.data);

            Swal.fire({
                title: "Muvaffaqiyatli!",
                icon: "success",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });

            onClose();
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Error.",
                icon: "error",
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        }
    };

    // console.log(data)

    return (
        <div
            className={`fixed inset-0 bg-[#0000006b] z-50 flex items-center justify-center transition-opacity duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
        >
            <div
                className={`TestModal p-4 sm:p-6 bg-white rounded-[8px] w-[10   0%] sm:w-[50%] lg:w-[28%] transform transition-all duration-500 
                    ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className=" text-[black] text-[20px]">Ready to submit tests?</h2>
                <p className="text-[14px] text-[#535862] mt-[10px]">
                    Please be aware that if you exit full screen mode or switch to another tab during the exam, you will be automatically terminated from the exam. Stay focused and make sure to keep your full attention on the exam to avoid any disruptions. Good luck! 📚🚫🚷
                </p>
                <div className="flex items-center justify-center gap-[30px] mt-[10px]">
                    <button
                        onClick={StartExam}
                        className="mt-4 bg-blue-600 w-full text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
}

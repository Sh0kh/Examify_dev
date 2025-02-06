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
                className={`TestModal p-[10px] bg-MainColor rounded-[8px] w-[40%] py-[30px] transform transition-all duration-500 ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-75 opacity-0 translate-y-10"
                    }`}
            >
                <h2 className="text-center text-[white] text-[20px]">Are you ready to start the exam?</h2>
                <div className="flex items-center justify-center gap-[30px] mt-[10px]">
                    <button
                        onClick={StartExam}
                        className="bg-[white] p-[10px] rounded-[5px] px-[20px] border-[2px] transition duration-500 hover:bg-transparent hover:text-[white]"
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
}

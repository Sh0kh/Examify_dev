import { NavLink } from "react-router-dom";

export default function MultiLevelSatrtModal({ isOpen, onClose }) {
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
                    <NavLink to={'/multi-level/exam'}>
                        <button className="bg-[white] p-[10px] rounded-[5px] px-[20px] border-[2px] transition duration-500 hover:bg-transparent hover:text-[white]">
                            AI
                        </button>
                    </NavLink>
                    <button onClick={onClose} className="bg-[white] p-[10px] rounded-[5px] px-[20px] border-[2px] transition duration-500 hover:bg-transparent hover:text-[white]">
                        Human
                    </button>
                </div>
            </div>
        </div>
    )
}
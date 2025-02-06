import CONFIG from "../../../Service/Config2";

export default function Part4({ data, onAnswerSelect, selectedAnswers }) {
    return (
        <div className="p-4 space-y-8 pb-[100px]">
            <div>
                <p className="text-lg font-semibold">
                    {data?.description}
                </p>
            </div>
            <div className="block">
                <img className="w-[400px] h-[400px] object-cover" src={CONFIG.API_URL + data?.photo_path} alt="foto" />
            </div>
            <div className="space-y-4 max-w-[700px]">
                {data?.questions?.map((question, index) => (
                    <div key={question.id} className="flex items-center space-x-4">
                        <span className="bg-MainColor text-[white] p-[5px] rounded-[5px]">
                            {18 + index}
                        </span>
                        <span className="text-md font-medium">Center...</span>
                        <select
                            value={selectedAnswers[question.id] || ""} // Запоминает выбранный ответ

                            className="border w-[200px] border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => onAnswerSelect(question.id, e.target.value, null, "select")}
                        >
                            <option value="" disabled selected>
                                Select
                            </option>
                            {question?.answers?.map((answer) => (
                                <option key={answer.id} value={answer.id}>
                                    {answer.answer}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Part6() {
    return (
        <div className="p-4 space-y-8 pb-[100px] mx-auto">
            {/* Инструкция */}
            <div>
                <p className="text-lg font-semibold">
                    You will hear a part of a lecture. For each question, fill in the missing information in the numbered space.
                    Write no more than ONE WORD for each answer.
                </p>
            </div>

            {/* Задания */}
            <div className="space-y-6">
                {[
                    { text: "The gorilla come from Central", number: 30 },
                    { text: "It lives in mountain forests.", number: null },
                    { text: "This animal builds a nest on the", number: 31 },
                    { text: "The mountain gorilla has a thick coat of fur.", number: null },
                    { text: "Older males have", number: 32 },
                    { text: "Younger males are called black", number: 33 },
                    { text: "It eats plants, including leaves, fruit and flowers.", number: null },
                    { text: "Plants provide the", number: 34 },
                    { text: "People are destroying the environment where the gorillas live.", number: null },
                    { text: "The gorillas are also suffering from unlawful", number: 35 },
                ].map(({ text, number }, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <p className="text-md">{text}</p>
                        {number && (
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder=" "
                                    className="border-b-[2px] border-gray-300 rounded-md w-36 pl-8 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-MainColor text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                    {number}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

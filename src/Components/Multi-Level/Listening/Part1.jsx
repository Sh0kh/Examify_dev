export default function Part1() {
    return (
        <div className="p-4  mx-auto space-y-8 pb-[100px]">
            {/* Инструкция */}
            <div>
                <p className="text-lg font-semibold">
                    You will hear some sentences. You will hear each sentence twice. Choose the correct reply to each sentence (A, B, or C). Mark your answers on the answer sheet.
                </p>
                <p className="font-bold mt-4">Example:</p>
                <div className="pl-6 mt-2 space-y-2">
                    <label className="block">
                        <input type="checkbox" className="mr-2" /> A) She often does.
                    </label>
                    <label className="block">
                        <input type="checkbox" className="mr-2" /> B) I can't remember it.
                    </label>
                    <label className="block">
                        <input type="checkbox" className="mr-2" /> C) Everyone knows her.
                    </label>
                </div>
            </div>

            {/* Вопросы */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Вопрос 1 */}
                <div className="flex">
                    <div className="w-8 h-8 flex items-center justify-center bg-MainColor text-white font-bold rounded-full mr-4">
                        1
                    </div>
                    <div className="space-y-2">
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> A) What a pity!
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> B) I’m afraid not.
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> C) Not bad, thank you.
                        </label>
                    </div>
                </div>

                {/* Вопрос 2 */}
                <div className="flex">
                    <div className="w-8 h-8 flex items-center justify-center bg-MainColor text-white font-bold rounded-full mr-4">
                        2
                    </div>
                    <div className="space-y-2">
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> A) I’d love to.
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> B) It’s usually Ok.
                        </label>
                        <label className="block">
                            <input type="checkbox" className="mr-2" /> C) We’ve got purple walls.
                        </label>
                    </div>
                </div>

                {/* Добавь остальные вопросы */}
                {Array.from({ length: 6 }, (_, i) => (
                    <div key={i + 3} className="flex">
                        <div className="w-8 h-8 flex items-center justify-center bg-MainColor text-white font-bold rounded-full mr-4">
                            {i + 3}
                        </div>
                        <div className="space-y-2">
                            <label className="block">
                                <input type="checkbox" className="mr-2" /> A) Option A for question {i + 3}.
                            </label>
                            <label className="block">
                                <input type="checkbox" className="mr-2" /> B) Option B for question {i + 3}.
                            </label>
                            <label className="block">
                                <input type="checkbox" className="mr-2" /> C) Option C for question {i + 3}.
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

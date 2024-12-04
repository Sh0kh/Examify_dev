export default function Part2() {
    return (
        <div className="p-4 mx-auto space-y-8 pb-[100px]">
            {/* Инструкция */}
            <div>
                <p className="text-lg font-semibold">
                    You will hear someone giving a talk. For each question, fill in the missing information in the numbered space. Write ONE WORD and/or A NUMBER for each answer.
                </p>
                <p className="font-bold mt-4">
                    The name of the program is <span className="text-MainColor">0</span> love online.
                </p>
            </div>

            {/* Вопросы */}
            <div className="space-y-6">
                {/* Вопрос 9 */}
                <div className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-MainColor text-white font-bold rounded-full mr-4">
                        9
                    </span>
                    <p className="flex-1">
                        The main topic of the radio conversations is love stories that people had{' '}
                        <input
                            type="text"
                            className="border-b-2 border-gray-400 focus:border-MainColor outline-none text-center w-32"
                            placeholder="__________"
                        />.
                    </p>
                </div>

                {/* Вопрос 10 */}
                <div className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-MainColor text-white font-bold rounded-full mr-4">
                        10
                    </span>
                    <p className="flex-1">
                        Alan feels himself{' '}
                        <input
                            type="text"
                            className="border-b-2 border-gray-400 focus:border-MainColor outline-none text-center w-32"
                            placeholder="__________"
                        />{' '}
                        when talking to others.
                    </p>
                </div>

                {/* Вопрос 11 */}
                <div className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-MainColor text-white font-bold rounded-full mr-4">
                        11
                    </span>
                    <p className="flex-1">
                        Alan and Susan had a new{' '}
                        <input
                            type="text"
                            className="border-b-2 border-gray-400 focus:border-MainColor outline-none text-center w-32"
                            placeholder="__________"
                        />{' '}
                        when they had a 4-month relationship.
                    </p>
                </div>

                {/* Вопрос 12 */}
                <div className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-MainColor text-white font-bold rounded-full mr-4">
                        12
                    </span>
                    <p className="flex-1">
                        The reason why Kate used loveonline.com is the lack of{' '}
                        <input
                            type="text"
                            className="border-b-2 border-gray-400 focus:border-MainColor outline-none text-center w-32"
                            placeholder="__________"
                        />.
                    </p>
                </div>

                {/* Вопрос 13 */}
                <div className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-MainColor text-white font-bold rounded-full mr-4">
                        13
                    </span>
                    <p className="flex-1">
                        The name of the third caller to the radio is{' '}
                        <input
                            type="text"
                            className="border-b-2 border-gray-400 focus:border-MainColor outline-none text-center w-32"
                            placeholder="__________"
                        />.
                    </p>
                </div>

                {/* Вопрос 14 */}
                <div className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-MainColor text-white font-bold rounded-full mr-4">
                        14
                    </span>
                    <p className="flex-1">
                        Paulo saw the photo of his{' '}
                        <input
                            type="text"
                            className="border-b-2 border-gray-400 focus:border-MainColor outline-none text-center w-32"
                            placeholder="__________"
                        />{' '}
                        on the newspaper.
                    </p>
                </div>
            </div>
        </div>
    );
}

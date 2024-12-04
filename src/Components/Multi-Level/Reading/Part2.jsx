import React from 'react'


function Part2() {

    const options = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

    return (
        <div className='Readin__wrapper overflow-hidden flex gap-[20px] border-t-[2px] pt-[10px]'>
            <div className='overflow-y-scroll h-screen  w-[50%] px-[15px] pb-[150px]'>
                <strong className='my-[15px] text-[20px] block'>
                    Part 2
                </strong>
                <img className='w-[300px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTei6gObesLyScMlHT0SoNZdwHsWxXS6k-zLw&s" alt="" />
            </div>
            <div className='ReadingLine w-full bg-MainColor h-[5px] my-[10px] hidden'>

            </div>
            <div className='overflow-y-scroll h-screen pb-[150px] w-[50%]'>
                <div className="p-4 space-y-8 pb-[100px] max-w-3xl mx-auto">
                    {/* Инструкция */}
                    <div>
                        <p className="text-lg font-semibold">
                            Read the texts 7-14 and the statements A-J. Decide which text matches the situation described in the statements.
                            Each statement can be used ONCE only. There are TWO extra statements which you do not need to use.
                            <br />
                            Mark your answers on the answer sheet. Questions 7-14.
                            <br />
                            Look at the seven job advertisements, A-K, and read the descriptions of people below.
                            <br />
                            Write the correct letter (A-K) for each person.
                        </p>
                    </div>

                    {/* Задания */}
                    <div className="space-y-4">
                        {Array.from({ length: 8 }, (_, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <span className="text-md font-medium">{7 + i}</span>
                                <select className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="" disabled selected>
                                        Select an answer
                                    </option>
                                    {options.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Part2
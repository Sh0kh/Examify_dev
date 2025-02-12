import React from 'react'
import DOMPurify from 'dompurify';



function Part5({ data, selectedAnswers, onAnswerSelect }) {

    console.log(data)

    return (
        <div className='Readin__wrapper overflow-hidden flex gap-[20px] border-t-[2px] pt-[10px]'>
            <div className='overflow-y-scroll h-screen  w-[50%] px-[15px] pb-[150px]'>
                <strong className='my-[15px] text-[20px] block'>
                    Part 5
                </strong>
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.description)
                    }}
                />
            </div>
            <div className='ReadingLine w-full bg-MainColor h-[5px] my-[10px] hidden'>

            </div>
            <div className='overflow-y-scroll h-screen pb-[150px] pt-[30px] w-[50%]'>
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.right_text)
                    }}
                />
                <p className='mt-[20px]'>
                    Innovations in technology have altered how we access and engage with <strong className='bg-MainColor py-[2px] px-[8px] rounded-[50%] text-[white]' >1</strong><input type="text" className="border-b border-gray-300 px-2 py-1 ml-1" />
                    , shifting away from traditional paper-based methods to <strong className='bg-MainColor py-[2px] px-[8px] rounded-[50%] text-[white]'>2</strong><input type="text" className="border-b border-gray-300 px-2 py-1 ml-1" />
                    , which offers convenient access to a range of data, while high-speed internet enables <strong className='bg-MainColor py-[2px] px-[8px] rounded-[50%] text-[white]'>3</strong><input type="text" className="border-b border-gray-300 px-2 py-1 ml-1" />
                    information exchange. Electronic books, or e-books, provide instant access to a wide range of titles without the need foк
                </p>

                {data?.questions?.map((i, index) => (
                    < div key={index}>
                        <div className="flex items-center mb-[10px]">
                            <div className="w-8 h-8 flex items-center justify-center bg-MainColor text-white font-bold rounded-full mr-4">
                                {24 + index}
                            </div>
                            <p className="font-bold ">{i?.question}</p>
                        </div>
                        <div className="space-y-2">
                            {i?.answers?.map((answer, aIndex) => (
                                <label key={aIndex} className="block">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        className="mr-2"
                                        value={answer.id}
                                        checked={selectedAnswers[i.id] === answer.id}
                                        onChange={() => onAnswerSelect(i.id, answer.id)}
                                    />
                                    {answer?.answer}
                                </label>
                            ))}
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Part5
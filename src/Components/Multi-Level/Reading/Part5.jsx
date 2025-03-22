import React, { useEffect, useMemo } from 'react';
import DOMPurify from 'dompurify';

function Part5({ data, selectedAnswers, onAnswerSelect, question_type }) {
    console.log(data);

    const filteredQuestions = useMemo(() => {
        return data?.questions?.filter(question => question.type !== "writing") || [];
    }, [data?.questions]);

    const writingQuestion = useMemo(() => {
        return data?.questions?.find(question => question.type === "writing") || null;
    }, [data?.questions]);

    useEffect(() => {
        const inputs = document.querySelectorAll(".part2-input");

        const updateAnswers = (event) => {
            const input = event.target;
            const question_id = input.dataset.questionId;
            const value = input.value;
            onAnswerSelect(question_id, null, value, "writing");
        };

        inputs.forEach(input => input.addEventListener("input", updateAnswers));
        return () => {
            inputs.forEach(input => input.removeEventListener("input", updateAnswers));
        };
    }, [data, onAnswerSelect]);

    return (
        <div className='Readin__wrapper overflow-hidden flex gap-[20px]  pt-[10px]'>
            <div className='overflow-y-scroll h-screen  w-[50%] px-[15px] pb-[150px] border-[1px] rounded-[15px] bg-[white]'>
                <strong className='my-[15px] text-[20px] block'>
                    Part 5
                </strong>
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.description)
                    }}
                />
            </div>
            <div className='ReadingLine w-full bg-MainColor h-[5px] my-[10px] hidden'></div>
            <div className='overflow-y-scroll h-screen pb-[150px] pt-[30px] w-[50%] border-[1px] rounded-[15px] bg-[white] p-[15px]'>
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.right_text)
                    }}
                />
                <p className='mt-[20px]'>
                    <p className='mt-[20px]'>
                        {writingQuestion && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        writingQuestion.question.replace(/\{inputext\}/g, () => {
                                            return `<input type="text"
                                class="border-b-[black] border-b-[2px] outline-none px-2 py-1 rounded part2-input"
                                data-question-id="${writingQuestion.id}"
                            />`;
                                        })
                                    )
                                }}
                            />
                        )}
                    </p>

                </p>

                {filteredQuestions.map((i, index) => (
                    <div key={index} className='mt-[10px]'>
                        <div className="flex items-center mb-[10px]">
                            <div className="w-8 h-8 flex items-center justify-center bg-[#2970FF] text-white font-bold rounded-full mr-4">
                                {24 + index}
                            </div>
                            <p className="font-bold">{i?.question}</p>
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
                ))}
            </div>
        </div>
    );
}

export default Part5;

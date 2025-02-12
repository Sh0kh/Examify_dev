import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';

function Part1({ data, onAnswerSelect }) {
    // console.log(data);

    const processedHtml = data?.questions
        ?.map((question, ) => {
            return question.question.replace(/\{inputext\}/g, () => {
                return `<input type="text"
                    class="border-b-[black] border-b-[2px] outline-none px-2 py-1 rounded part2-input"
                    data-question-id="${question.id}"
                />`;
            });
        })
        .join("");

    useEffect(() => {
        const inputs = document.querySelectorAll(".part2-input");

        const updateAnswers = () => {
            const updatedAnswers = Array.from(inputs).map(input => ({
                question_id: input.dataset.questionId,
                answer_id: input.dataset.answerId,
                question_type: "writing",
                answer_text: input.value
            }));

            onAnswerSelect(null, null, updatedAnswers);
        };

        inputs.forEach(input => input.addEventListener("input", updateAnswers));
        return () => {
            inputs.forEach(input => input.removeEventListener("input", updateAnswers));
        };
    }, [data, onAnswerSelect]);

    return (
        <div className='Readin__wrapper overflow-hidden flex gap-[20px] border-t-[2px] pt-[10px]'>
            <div className='overflow-y-scroll h-screen w-[50%] px-[15px] pb-[150px]'>
                <strong className='my-[15px] text-[20px] block'>Part 1</strong>
                <strong className='my-[15px] block'>{data?.description}</strong>
            </div>
            <div className='ReadingLine w-full bg-MainColor h-[5px] my-[10px] hidden'></div>
            <div className='overflow-y-scroll h-screen pb-[150px] w-[50%]'>
                {processedHtml && (
                    <div
                        className="space-y-6"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(processedHtml)
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default Part1;

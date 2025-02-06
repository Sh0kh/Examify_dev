import { useEffect } from "react";
import DOMPurify from "dompurify";

export default function Part2({ data, onAnswerSelect }) {
    // Генерируем инпуты для каждого вопроса
    const processedHtml = data?.questions
        ?.map((question) => {
            let answerIndex = 0; // Индекс для перебора ответов

            return question.question.replace(/\{inputext\}/g, () => {
                const answer = question.answers?.[answerIndex] || {}; // Берем соответствующий answer_id
                answerIndex++; // Увеличиваем индекс ответа

                return `<input type="text"
                class="border-b-[black] border-b-[2px] outline-none px-2 py-1 rounded part2-input"
                data-question-id="${question.id}"
                data-answer-id="${answer.id || ''}" 
            />`;
            });
        })
        .join("");



    useEffect(() => {
        const inputs = document.querySelectorAll(".part2-input");
        const updateAnswers = () => {
            const updatedAnswers = Array.from(inputs).map(input => ({
                question_id: input.dataset.questionId,
                answer_id: input.dataset.answerId || null, // Привязываем answer_id
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
        <div className="p-4 mx-auto space-y-8 pb-[100px]">
            <div>
                <p className="text-lg font-semibold">{data?.description}</p>
            </div>
            {processedHtml && (
                <div
                    className="space-y-6"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(processedHtml)
                    }}
                />
            )}
        </div>
    );
}
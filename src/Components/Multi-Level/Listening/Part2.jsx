import { useEffect } from "react";

export default function Part2({ data, onAnswerSelect, selectedAnswers }) {
    const processContent = (question) => {
        const parts = question.question.split(/\{inputext\}/g);
        const elements = [];

        parts.forEach((part, index) => {
            elements.push(<span className="inline" key={`text-${index}`} dangerouslySetInnerHTML={{ __html: part }} />);

            if (index !== parts.length - 1) {
                const answerId = `${question.id}-${index}`;
                const answer = selectedAnswers.find(a =>
                    a.question_id == question.id &&
                    a.answer_id === answerId
                ) || { answer_text: "" };
                elements.push(
                    <input
                        key={`input-${question.id}-${index}`}
                        type="text"
                        className="border-b-[black] border-b-[2px] inline outline-none px-2 py-1 rounded part2-input"
                        value={answer.answer_text}
                        onChange={(e) => handleInputChange(question.id, answerId, e.target.value)}
                    />
                );
            }
        }); 
        return elements;
    };

    const handleInputChange = (questionId, answerId, value) => {
        const newAnswers = selectedAnswers
            .filter(a => !(a.question_id == questionId && a.answer_id === answerId))
            .concat({
                question_id: questionId,
                answer_id: answerId,
                answer_text: value,
                question_type: "writing"
            })
            .filter(a => a.answer_text.trim() !== "");

        onAnswerSelect(null, null, newAnswers);
    };

    return (
        <div className="p-4 mx-auto space-y-8 pb-[100px]">
            <div>
                <p className="text-lg font-semibold">{data?.description}</p>
            </div>
            {data?.questions?.map((question) => (
                <div key={question.id} className="space-y-6">
                    {processContent(question)}
                </div>
            ))}
        </div>
    );
}
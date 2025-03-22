import React, { useEffect } from "react";

export default function Part2({ data, onAnswerSelect, selectedAnswers }) {
    // Обработчик изменения значения input
    const handleInputChange = (questionId, answerId, value) => {
        // Фильтруем старые ответы и добавляем новый
        const newAnswers = [
            ...selectedAnswers.filter(
                (a) => !(a.question_id === questionId && a.answer_id === answerId)
            ),
            {
                question_id: questionId,
                answer_id: answerId,
                answer_text: value,
                question_type: "writing",
            },
        ].filter((a) => a.answer_text !== ""); // Удаляем пустые ответы

        // Передаем новые ответы на уровень выше
        onAnswerSelect(null, null, newAnswers);
    };

    // Функция для рендера HTML контента с вставкой input полей
    const renderQuestionContent = (question) => {
        // Если вопрос не задан, вернем пустой фрагмент
        if (!question || !question.question) {
            return <React.Fragment />;
        }

        // Создаем регулярное выражение для поиска {inputext}
        const inputRegex = /\{inputext\}/g;

        // Проверяем наличие {inputext} в вопросе
        if (!inputRegex.test(question.question)) {
            // Если нет меток ввода, просто возвращаем HTML как есть
            return <div dangerouslySetInnerHTML={{ __html: question.question }} />;
        }

        // Разбиваем HTML на части до и после {inputext}
        const parts = question.question.split(inputRegex);

        // Создаем массив для результата
        const result = [];

        // Обходим каждую часть
        for (let i = 0; i < parts.length; i++) {
            // Добавляем текущую часть HTML
            if (parts[i]) {
                result.push(
                    <span key={`part-${i}`} dangerouslySetInnerHTML={{ __html: parts[i] }} />
                );
            }

            // Добавляем input поле после всех частей, кроме последней
            if (i < parts.length - 1) {
                const answerId = `${question.id}-input-${i}`;

                // Находим ответ для этого поля ввода
                const answer = selectedAnswers.find(
                    (a) => a.question_id === question.id && a.answer_id === answerId
                ) || { answer_text: "" };

                // Добавляем поле ввода
                result.push(
                    <input
                        key={answerId}
                        type="text"
                        className="border-b-[black] border-b-[2px] inline outline-none px-2 py-1 rounded part2-input"
                        value={answer.answer_text}
                        onChange={(e) => handleInputChange(question.id, answerId, e.target.value)}
                    />
                );
            }
        }

        return result;
    };

    // Обработчик для безопасного рендеринга компонента
    const safeRender = (question) => {
        try {
            return renderQuestionContent(question);
        } catch (error) {
            console.error("Ошибка рендеринга вопроса:", error);
            return (
                <div className="p-2 bg-red-100 border border-red-400 rounded">
                    <p>Произошла ошибка при рендеринге вопроса.</p>
                    <p>Текст ошибки: {error.message}</p>
                </div>
            );
        }
    };

    return (
        <div className="p-4 mx-auto space-y-8 pb-[100px]">
            {/* Описание теста */}
            <div>
                <p className="text-lg font-semibold">{data?.description}</p>
            </div>

            {/* Вопросы */}
            {data?.questions?.map((question) => (
                <div key={question.id} className="space-y-6">
                    {safeRender(question)}
                </div>
            ))}
        </div>
    );
}
import React, { useState } from 'react';
import DOMPurify from 'dompurify';

function Part1({ data, onAnswerSelect, onTextChange }) {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
        onTextChange(e.target.value);
    };

    return (
        <div className='Readin__wrapper overflow-hidden flex gap-[20px] border-t-[2px] pt-[10px]'>
            <div className='overflow-y-scroll h-screen  w-[50%] px-[15px] pb-[150px]'>
                <strong className='my-[15px] text-[20px] block'>
                    Part 1
                </strong>
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.description)
                    }}
                />
            </div>
            <div className='ReadingLine w-full bg-MainColor h-[5px] my-[10px] hidden'></div>
            <div className='overflow-y-scroll h-screen pb-[150px] pt-[30px] w-[50%]'>
                <textarea
                    className='border-[2px] resize-none w-[100%] p-[10px] h-[400px]'
                    placeholder='Write...'
                    value={text}
                    onChange={handleTextChange} // Обновляем текст
                />
            </div>
        </div>
    );
}

export default Part1;

import React from 'react'

function Part1() {
    return (
        <div className='Readin__wrapper overflow-hidden flex gap-[20px] border-t-[2px] pt-[10px]'>
            <div className='overflow-y-scroll h-screen  w-[50%] px-[15px] pb-[150px]'>
                <strong className='my-[15px] text-[20px] block'>
                    Part 1
                </strong>
                <strong className='my-[15px]  block'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi sapiente laboriosam odio! Nisi expedita atque recusandae rerum! At minus est libero? Beatae laudantium illo voluptas magnam saepe quis, nam obcaecati!
                </strong>

            </div>
            <div className='ReadingLine w-full bg-MainColor h-[5px] my-[10px] hidden'>

            </div>
            <div className='overflow-y-scroll h-screen pb-[150px] pt-[30px] w-[50%]'>
                <p className='font-bold mb-[20px]'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae amet animi voluptatem adipisci 
                </p>
                <textarea className='border-[2px] resize-none w-[100%] p-[10px] h-[400px]' placeholder='Write...' name="" id="">

                </textarea>
            </div>
        </div>
    )
}

export default Part1
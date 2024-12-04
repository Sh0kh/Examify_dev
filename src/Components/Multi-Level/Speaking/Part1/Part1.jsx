import React from 'react'
import Speaking1 from './Speaking1'
import Speaking2 from './Speaking2'
import Speaking3 from './Speaking3'

function Part1() {
    return (
        <div className='Container'>
            <div className='pb-[50px]'>

                <h1 className='font-bold text-[30px] mt-[20px]'>
                    Part 1.1
                </h1>

                <Speaking1 />
                <Speaking2 />
                <Speaking3 />

                <h1 className='font-bold text-[30px] mt-[20px]'>
                    Part 1.2
                </h1>

                <div className='flex items-center mt-[20px] justify-center gap-[20px] flex-wrap'>
                    <img className='w-[300px]' src="https://images.squarespace-cdn.com/content/v1/618e7f223fb749481d23c9c1/8ad0b113-c63a-4db9-809a-4c3eb51122ba/foto+logo.jpg" alt="" />
                    <img className='w-[300px]' src="https://images.squarespace-cdn.com/content/v1/618e7f223fb749481d23c9c1/8ad0b113-c63a-4db9-809a-4c3eb51122ba/foto+logo.jpg" alt="" />
                </div>

                <Speaking1 />
                <Speaking2 />
                <Speaking3 />

            </div>
        </div>
    )
}

export default Part1
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Service() {
    useGSAP(() => {
        // Animation for the title
        gsap.fromTo('.Service__title',
            { opacity: 0 },
            {
                opacity: 1,
                ease: 'power3.out',
                duration: 0.5,
                delay: 0.2,
                scrollTrigger: {
                    trigger: '.Service__title',
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                }
            }
        );

        // Animation for the first section of cards
        gsap.fromTo('.Service__wrapper',
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                ease: 'power3.out',
                duration: 1,
                scrollTrigger: {
                    trigger: '.Service__wrapper',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            }
        );

        // Animation for the second section of cards
        gsap.fromTo('.Service__wrapper2',
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                ease: 'power3.out',
                duration: 1.5,
                scrollTrigger: {
                    trigger: '.Service__wrapper2',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            }
        );
    }, []);

    return (
        <section className='Service mt-[200px] pb-[100px]'>
            <div className='Container'>
                <h1 className='Service__title text-MainColor text-center font-bold text-[55px] cursor-pointer transition-all duration-700 hover:tracking-widest'>
                    Our Services!
                </h1>
                <div className='Service__wrapper mt-[20px]'>
                    <div className='Service__Card border-[2px] border-MainColor px-[30px] py-[20px] rounded-[8px] cursor-pointer shadow-lg duration-500 hover:shadow-slate-500'>
                        <svg className='text-[50px] text-MainColor' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 21q1.136 1 2 1q3 0 3-3q0-2 2-4c1.267-1.267 2-3.067 2-5a7 7 0 0 0-14 0m11 0a4 4 0 1 0-8 0M3 20l5-6l1 4l5-6"></path></svg>
                        <h3 className='font-bold text-[30px]'>
                            Listening
                        </h3>
                        <p className='text-[18px]'>
                            Professional and high-quality audio transcripts
                        </p>
                    </div>
                    <div className='Service__Card border-[2px] border-MainColor px-[30px] py-[20px] rounded-[8px] cursor-pointer shadow-lg duration-500 hover:shadow-slate-500'>
                        <svg className='text-[50px] text-MainColor' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={44} d="M358.62 129.28L86.49 402.08L70 442l39.92-16.49l272.8-272.13zm54.45-54.44l-11.79 11.78l24.1 24.1l11.79-11.79a16.51 16.51 0 0 0 0-23.34l-.75-.75a16.51 16.51 0 0 0-23.35 0"></path></svg>
                        <h3 className='font-bold text-[30px]'>
                            Writing
                        </h3>
                        <p className='text-[18px]'>
                            In-depth review of your answers
                        </p>
                    </div>
                    <div className='Service__Card border-[2px] border-MainColor px-[30px] py-[20px] rounded-[8px] cursor-pointer shadow-lg duration-500 hover:shadow-slate-500'>
                        <svg className='text-[50px] text-MainColor' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><rect width={6} height={12} x={9} y={2} fill="currentColor" rx={3}></rect><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v2M1 2v4m18-3v2m4-3v4M5 10v1a7 7 0 0 0 7 7v0a7 7 0 0 0 7-7v-1m-7 8v4m0 0H9m3 0h3"></path></g></svg>
                        <h3 className='font-bold text-[30px]'>
                            Speaking
                        </h3>
                        <p className='text-[18px]'>
                            Speaking assistance with AI
                        </p>
                    </div>
                    <div className='Service__Card2 hidden border-[2px] border-MainColor px-[30px] py-[20px] rounded-[8px] cursor-pointer shadow-lg duration-500 hover:shadow-slate-500'>
                        <svg className='text-[50px] text-MainColor' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M640 1664q43 0 75 9t60 26t53 41t54 52H0V256h128v1408zm0-1536q67 0 132 16t124 50v1435q-54-45-120-69t-136-24H256V128zm1280 128v1536h-882q28-28 53-52t53-40t60-26t76-10h512V256zm-640 1280q-70 0-136 24t-120 69V194q59-33 124-49t132-17h384v1408z"></path></svg>
                        <h3 className='font-bold text-[30px]'>
                            Reading
                        </h3>
                        <p className='text-[18px]'>
                            Reading assistance with AI
                        </p>
                    </div>
                    <div className='Service__Card2 hidden border-[2px] border-MainColor px-[30px] py-[20px] rounded-[8px] cursor-pointer shadow-lg duration-500 hover:shadow-slate-500'>
                        <svg className='text-[50px] text-MainColor' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-6h16V6H4z"></path></svg>
                        <h3 className='font-bold text-[30px]'>
                            Full Exam
                        </h3>
                        <p className='text-[18px]'>
                            Complete IELTS exam preparation
                        </p>
                    </div>
                </div>
                <div className='Service__wrapper2'>
                    <div className='Service__Card border-[2px] border-MainColor px-[30px] py-[20px] rounded-[8px] cursor-pointer shadow-lg duration-500 hover:shadow-slate-500'>
                        <svg className='text-[50px] text-MainColor' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M640 1664q43 0 75 9t60 26t53 41t54 52H0V256h128v1408zm0-1536q67 0 132 16t124 50v1435q-54-45-120-69t-136-24H256V128zm1280 128v1536h-882q28-28 53-52t53-40t60-26t76-10h512V256zm-640 1280q-70 0-136 24t-120 69V194q59-33 124-49t132-17h384v1408z"></path></svg>
                        <h3 className='font-bold text-[30px]'>
                            Writing Assessment
                        </h3>
                        <p className='text-[18px]'>
                            Evaluation of your writing skills
                        </p>
                    </div>
                    <div className='Service__Card border-[2px] border-MainColor px-[30px] py-[20px] rounded-[8px] cursor-pointer shadow-lg duration-500 hover:shadow-slate-500'>
                        <svg className='text-[50px] text-MainColor' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M640 1664q43 0 75 9t60 26t53 41t54 52H0V256h128v1408zm0-1536q67 0 132 16t124 50v1435q-54-45-120-69t-136-24H256V128zm1280 128v1536h-882q28-28 53-52t53-40t60-26t76-10h512V256zm-640 1280q-70 0-136 24t-120 69V194q59-33 124-49t132-17h384v1408z"></path></svg>
                        <h3 className='font-bold text-[30px]'>
                            Speaking Practice
                        </h3>
                        <p className='text-[18px]'>
                            Get practice for your speaking skills
                        </p>
                    </div>
                    <div className='Service__Card border-[2px] border-MainColor px-[30px] py-[20px] rounded-[8px] cursor-pointer shadow-lg duration-500 hover:shadow-slate-500'>
                        <svg className='text-[50px] text-MainColor' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M640 1664q43 0 75 9t60 26t53 41t54 52H0V256h128v1408zm0-1536q67 0 132 16t124 50v1435q-54-45-120-69t-136-24H256V128zm1280 128v1536h-882q28-28 53-52t53-40t60-26t76-10h512V256zm-640 1280q-70 0-136 24t-120 69V194q59-33 124-49t132-17h384v1408z"></path></svg>
                        <h3 className='font-bold text-[30px]'>
                            Mock Tests
                        </h3>
                        <p className='text-[18px]'>
                            Practice with full mock exams
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Service;

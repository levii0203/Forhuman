"use client"
import React, {useRef} from 'react'
import { useDispatch } from "react-redux"
import { setNext } from "../../store/slice/chat";



export default function WhatsNext(){
    const fileInputRef = useRef(null)
    const dispatch = useDispatch();

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="h-full w-full m-0 flex relative justify-center">
            <div className="mt-[4%] mb-[4%] relative w-full mx-[8%] flex flex-col rounded-3xl overflow-y-auto overflow-x-hidden max-w-[1200px] border-[1px] border-[rgba(0,0,0,0.32)] ">
                <div className="flex w-full justify-between pl-[6%] pr-[3%] mt-[3%]">
                    <p className="flex flex-wrap w-full font-semibold text-xl max-w-[75%]">Hey users, what next would you like to have in the platform suggest us, so that we could start building for you. Select and submit</p>
                    <div className="flex h-8 w-8 border-[1px] items-center justify-center rounded-full border-[rgba(0,0,0,0.35)] cursor-pointer hover:opacity-85" onClick={()=>dispatch(setNext(false))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none" className="flex">
                        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
                        </svg>
                    </div>
                </div>
                <div className="grid relative md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 ml-[3%] mr-[5%] h-fit mt-12">
                    <div className="grid relative grid-cols-1 md:gap-8 grid-rows-3 md:grid-rows-4">
                        <div className="flex items-start h-fit gap-4">
                            <input type="radio" className="flex h-4 w-4 mt-2"/>
                            <p  className="text-[20px] flex">Text to AR apps </p>
                        </div>
                        <div className="flex items-start h-fit gap-4">
                            <input type="radio" className="flex h-4 w-4 mt-2"/>
                            <p  className="text-[20px] flex">AI Meetings to record, plan, edit, etc </p>
                        </div>
                        <div className="flex items-start h-fit  gap-4">
                            <input type="radio" className="flex h-4 w-4 mt-2"/>
                            <p  className="text-[20px] flex">Create AI reels and AI youtube shorts</p>
                        </div>
                        <div className="hidden items-start h-fit md:flex  gap-4">
                            <input type="radio" className="flex h-4 w-4 mt-2"/>
                            <p  className="text-[20px] flex">Type your own message: </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 relative md:mb-[6%] grid-rows-3">
                        <div className="flex items-start h-fit gap-4">
                            <input type="radio" className="flex h-4 w-4 mt-[10px]"/>
                            <p  className="text-[20px] flex-wrap">Create AI agents for yourself that will completely work for on your behalf</p>
                        </div>
                        <div className="flex items-start h-fit  gap-4">
                            <input type="radio" className="flex h-4 w-4 mt-[10px]"/>
                            <p  className="text-[20px] flex-wrap">Create animated videos like Disney, Pixar upto 10 mins approx</p>
                        </div>
                        <div className="flex items-start h-fit  gap-4">
                            <input type="radio" className="flex h-4 w-4 mt-[10px]"/>
                            <p  className="text-[20px] flex-wrap">AI phone number that will work 24/7 with you. Save that number in contact list and talk with AI with Indian languages on various topic</p>
                        </div>
                    </div>
                </div>
                <div className="flex relative items-start md:hidden ml-[3%] mr-[5%] mt-4 gap-4">
                    <input type="radio" className="flex h-4 w-4 mt-2"/>
                    <p  className="text-[20px] flex">Type your own message: </p>
                </div>
                <div className="flex w-full relative justify-center ">
                    <textarea className="bg-[rgba(217,217,217,0.33)] relative   flex w-full max-w-[85%] rounded-3xl px-8 py-8 outline-0" rows={6} placeholder="Write your message what another thing you want or share links references about what you want. Upload images, videos, documents in detailed format explaining what you want in next version"/>
                    <button className="absolute bottom-[10%] items-center justify-center flex rounded-full left-[9%] h-12 w-12 bg-white border-[1px] border-[rgba(0,0,0,0.29)]" onClick={handleFileButtonClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none" className="flex cursor-pointer hover:opacity-65">
                        <path d="M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z" fill="#1C274C"/>
                        <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="#1C274C"/>
                        </svg>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }} // Hide the default input
                    />
                </div>
                <div className="w-full relative items-end h-full  py-[3%] flex justify-center ">
                    <button className="bg-[rgba(103,35,176,0.61)] flex text-white cursor-pointer hover:opacity-75 py-[10px] text-[18px] px-8 font-bold rounded-full">Submit</button>
                </div>
            </div>
        </div>
    )
}
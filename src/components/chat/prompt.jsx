"use client"

import { useSelector } from "react-redux"


export default function PromptView({userPrompt}){
    return (
        <div className="flex h-fit pt-[2vh] w-full items-end flex-col">
            <div className="flex flex-col gap-[1vh] justify-end items-end w-full">
                <div className="flex justify-end md:justify-start h-fit flex-row gap-[2vh] w-fit py-[1vh]">
                    <div className="flex rounded-full h-[3vh] w-[3vh] justify-center items-center">
                        <img className="flex h-full w-full object-fill rounded-full"></img>
                    </div>
                    <p className="flex lg:text-xl font-light md:text-lg text-base sm:text-normal">Harsh Vardhan</p>
                </div>
                <div className="flex items-center w-fit py-4 px-4 bg-gray-100 rounded-xl xl:max-[60vh] lg:max-w-[40vh] md:max-w-[35vh] sm:max-w-[50vh] break-all shadow-xs max-w-[80%]">
                    <p className="flex flex-wrap xl:text-lg sm:text-normal text-base break-words font-light text-gray-600">{userPrompt}</p>
                </div>
            </div>
        </div>
    )
}
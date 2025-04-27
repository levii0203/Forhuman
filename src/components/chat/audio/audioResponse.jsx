"use client"

import { useSelector } from "react-redux"


export default function AudioResponseView({src}){
    const dark = useSelector((state)=>state.dark.is)
    return (
    <div className="flex h-fit pt-[2vh] w-full items-start flex-col">
         <div className="w-full flex flex-col">
                <div className="flex justify-start h-fit flex-row gap-[2vh] w-full py-[1vh]">
                    <div className={`flex rounded-full h-[3vh] w-[3vh] ${dark ? 'bg-zinc-600':'bg-[#eae5eb]'}`}></div>
                </div>
                <div className="flex w-full justify-start">
                    <audio src={src} controls/>
                </div>

            </div>
    </div>
    )
}
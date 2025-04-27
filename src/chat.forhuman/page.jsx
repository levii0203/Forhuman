"use client"

import { useState } from "react"
import PromptINput from "../components/input/promptInput";
import Footer from "../components/footer/footer";
import Chat from "../components/chat/chat";
import Preview from "../components/preview/preview";
import Welcome from "../components/welcome/welcome";
import { useSelector } from "react-redux";

 
export default function Page(){
    const load = useSelector((state)=>state.chat.load)
    return (
        <div className="flex flex-col h-full w-full items-center">
            { load ? (
                <>
                    <Welcome/>
                </>
            ):(
                /*
                <div className="flex m-0 flex-col justify-end items-center h-full w-full">
                    <Chat/>
                     <div className="flex flex-col items-center bottom-0 justify-center absolute h-fit w-full">
                        <PromptINput/>  
                        <Footer/>
                    </div>
                </div>*/
                <>
                <Chat/>
                <div className="flex flex-col items-center bottom-0 justify-center pb-[8vh] sm:pb-0 absolute h-fit w-full">
                    <PromptINput/>  
                    <Footer/>
                </div>
                </>
            )}
        </div>
    )
}
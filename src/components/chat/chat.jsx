"use client"
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MdContentCopy } from "react-icons/md";
import PromptResponseView from "./promptResponse";
import PromptView from "./prompt";
import '../../App.css';
import Help from "../help/help";
import Wait from "./wait_for_response";
import AudioResponseView from "./audio/audioResponse";


export const removeChat= ()=>{
    const chat = document.getElementById("chat");
    chat.innerHTML="";
}

export default function Chat() {
    const promptResponse = useSelector((state) => state.chat.promptResponse);
    const audio = useSelector((state)=>state.audio.audioUrls)
    const message = useSelector((state)=>state.chat.userPrompt)
    const sent = useSelector((state)=>state.chat.sent)
    const premium = useSelector((state)=>state.user.is_premium);
    const dark = useSelector((state)=>state.dark.isDark)
    const scroll = useRef(null);
    const chatBoxRef = useRef(null);



    return (
        <>
            {premium?(
                /*<div className="flex-1 p-0 m-0 flex flex-row h-full justify-center w-full overflow-hidden items-center">*/
                    <>
                    <div className="hidden md:flex h-full items-center justify-center w-full z-0 absolute md:right-[42%] xl:right-[calc(40%)]">
                        <Help className="z-20"/>
                    </div>
                    <div
                        id="chat"
                        ref={chatBoxRef}
                        className={`${dark ? 'custom-vertical-scrollbar':'custom-vertical-scrollbar-light'} w-full overflow x-hidden flex-1 m-0 z-20 h-auto min-h-0 max-h-[calc(100%)] flex flex-col overflow-y-auto pt-[14vh] md:pt-[6vh] pb-[16vh] lg:pb-[28vh] 
                        px-[calc(3%)] md:px-[calc(15%)] xl:px-[25vw]`}
                    >
                        
                       
                        {promptResponse.map((prompt, index) => (
                            <>
                            <PromptView key={index} userPrompt={prompt.message} index={index} chatBoxRef={chatBoxRef}/> 
                            {prompt.res.response?(
                                <>
                                <PromptResponseView key={index} userPrompt={prompt.res.response[0][1]} index={index} chatBoxRef={chatBoxRef}/> 
                                </>
                            ):(

                                <>
                                <PromptResponseView key={index} userPrompt="Sorry, there has been a trouble" index={index} chatBoxRef={chatBoxRef}/> 
                                </>
                            )}
                            {audio.length>=index+1 && audio[index] ? (
                                <AudioResponseView src={audio[index]}/>
                            ):(
                                <></>
                            )}
                            
                            </>
                        ))}
                        {sent?(
                            <>
                                <PromptView userPrompt={message} chatBoxRef={chatBoxRef}/>  
                                <Wait message="Waiting for a response"/>
                            </>
                        ):(
                            <></>
                        )}
                       
                    </div>
                </>
            ):(
                <div
                id="chat"
                ref={chatBoxRef}
                className={`${dark ? 'custom-vertical-scrollbar':'custom-vertical-scrollbar-light'} w-full overflow-x-hidden flex-1 m-0 z-20 min-h-0 flex flex-col overflow-y-auto pt-[5vh] md:pt-0 pb-[40vh] md:pb-64
                px-[calc(3%)] md:px-[calc(15%)] xl:px-[25vw]`}
            >
                
               
                {promptResponse.map((prompt, index) => (
                    <>
                    {console.log(prompt.res.response[0][1])}
                    <PromptView key={index} userPrompt={prompt.message} index={index} chatBoxRef={chatBoxRef}/> 
                    {prompt.res.response?(
                        <>
                        <PromptResponseView key={index} userPrompt={prompt.res.response[0][1]} index={index} chatBoxRef={chatBoxRef}/> 
                        </>
                    ):(
                        <>
                        <PromptResponseView key={index} userPrompt="Sorry, there has been a trouble" index={index} chatBoxRef={chatBoxRef}/> 
                        </>
                    )}

                    </>
                ))}
                {sent?(
                    <>
                        <PromptView userPrompt={message} chatBoxRef={chatBoxRef}/>  
                        <Wait message="Waiting for a response"/>
                    </>
                ):(
                    <></>
                )}
               
            </div>
            )};
        </>
    )
}

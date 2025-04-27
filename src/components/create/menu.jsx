"use client"
import { useDispatch, useSelector } from "react-redux";
import { setCreate, setCreateIs, setModel } from "../../store/slice/chat";
import { useState } from "react";



export default function CreateMenu(){
    const dispatch = useDispatch();
    const [game,setGame] = useState(false);
    const model = useSelector((state)=>state.chat.model)
    return (
        <>
        {game ? (
            <div className="h-fit flex flex-col p-2 w-48  rounded-xl absolute border-[#B3B3B3] border-[1px] bottom-12 bg-white">
                <div className="flex h-8 z-200 justify-between  items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 1024 1024" class="icon" version="1.1" onClick={()=>{setGame(false)}}><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px" viewBox="0 0 32 32"  onClick={()=>dispatch(setCreate(false))}>
                        <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                    </svg>
                </div>
            <div className="flex items-center gap-2 px-1 pb-1  w-full border-white hover:border-[#B3B3B3] rounded-xl border-[1px] " onClick={()=>{dispatch(setCreateIs("Game")); dispatch(setCreate(false)); dispatch(setModel("openai/gpt-3.5-turbo"))}}>
                <div className="flex flex-col mx-1">
                    <p className ="text-base font-semibold">Gpt-3.5-turbo</p>
                    <p className="text-sm">old</p>
                </div>
            </div>
            <div className="flex items-center gap-2 px-1 pb-1  w-full border-white hover:border-[#B3B3B3] rounded-xl border-[1px] " onClick={()=>{dispatch(setCreateIs("Game")); dispatch(setCreate(false)); dispatch(setModel("openai/gpt-4.1-nano"))}}>
                <div className="flex flex-col mx-1">
                    <p className ="text-base font-semibold">Gpt-4.1-nano</p>
                    <p className="text-sm">Good</p>
                </div>
            </div>
            <div className="flex items-center gap-2 p-1  w-full border-white hover:border-[#B3B3B3] rounded-xl border-[1px] ">
                <div className="flex flex-col mx-1">
                    <p className ="text-base font-semibold">llama</p>
                    <p className="text-sm">better</p>
                </div>
            </div>
            <div className="flex items-center gap-2 p-1  w-full border-white hover:border-[#B3B3B3] rounded-xl border-[1px] " onClick={()=>{dispatch(setCreateIs("Game")); dispatch(setCreate(false)); dispatch(setModel("deepseek/deepseek-r1-distill-qwen-32b:free"))}}>
                <div className="flex flex-col mx-1">
                    <p className ="text-base font-semibold">Deepseek-ri-distill</p>
                    <p className="text-sm">Best</p>
                </div>
            </div>
        </div>//transition-all duration-300 ease-out transform translate-y-8 opacity-0 hover:translate-y-0 hover:opacity-100
        ) : (
            <div className="h-fit flex flex-col p-2 w-48 rounded-xl absolute border-[#B3B3B3] border-[1px] bottom-12 bg-white " onMouseLeave={()=>dispatch(setCreate(false))}>
                <div className="flex items-center gap-2 p-1  w-full border-white hover:border-[#B3B3B3] rounded-xl border-[1px] cursor-pointer " onClick={()=>{setGame(true);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.75 6V3.75H11.25V6L9 6C6.10051 6 3.75 8.3505 3.75 11.25V17.909C3.75 19.2019 4.7981 20.25 6.09099 20.25C6.71186 20.25 7.3073 20.0034 7.74632 19.5643L10.8107 16.5H13.1893L16.2537 19.5643C16.6927 20.0034 17.2881 20.25 17.909 20.25C19.2019 20.25 20.25 19.2019 20.25 17.909V11.25C20.25 8.3505 17.8995 6 15 6L12.75 6ZM18.75 11.25C18.75 9.17893 17.0711 7.5 15 7.5L9 7.5C6.92893 7.5 5.25 9.17893 5.25 11.25V17.909C5.25 18.3735 5.62652 18.75 6.09099 18.75C6.31403 18.75 6.52794 18.6614 6.68566 18.5037L10.1893 15H13.8107L17.3143 18.5037C17.4721 18.6614 17.686 18.75 17.909 18.75C18.3735 18.75 18.75 18.3735 18.75 17.909V11.25ZM6.75 12.75V11.25H8.25V9.75H9.75V11.25H11.25V12.75H9.75V14.25H8.25V12.75H6.75ZM15 10.875C15 11.4963 14.4963 12 13.875 12C13.2537 12 12.75 11.4963 12.75 10.875C12.75 10.2537 13.2537 9.75 13.875 9.75C14.4963 9.75 15 10.2537 15 10.875ZM16.125 14.25C16.7463 14.25 17.25 13.7463 17.25 13.125C17.25 12.5037 16.7463 12 16.125 12C15.5037 12 15 12.5037 15 13.125C15 13.7463 15.5037 14.25 16.125 14.25Z" fill="#080341"/>
                    </svg>
                    <div className="flex flex-col">
                        <p className ="text-base font-semibold">Create Game</p>
                        <p className="text-sm">GameCre8v1.0</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none">
                    <path d="M10 7L15 12L10 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className="flex items-center gap-2 p-1  w-full border-white hover:border-[#B3B3B3] rounded-xl border-[1px] " onClick={()=>dispatch(setCreateIs("Music"))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9 18.5C11.8795 18.4769 11.0687 17.6349 11.0842 16.6142C11.0997 15.5936 11.9356 14.7766 12.9563 14.7845C13.9771 14.7924 14.8003 15.6222 14.8 16.643C14.7947 17.1413 14.5915 17.6171 14.2351 17.9654C13.8786 18.3138 13.3983 18.5061 12.9 18.5V18.5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 5.75003C4.58579 5.75003 4.25 6.08581 4.25 6.50003C4.25 6.91424 4.58579 7.25003 5 7.25003V5.75003ZM12 7.25003C12.4142 7.25003 12.75 6.91424 12.75 6.50003C12.75 6.08581 12.4142 5.75003 12 5.75003V7.25003ZM5 8.75003C4.58579 8.75003 4.25 9.08581 4.25 9.50003C4.25 9.91424 4.58579 10.25 5 10.25V8.75003ZM10 10.25C10.4142 10.25 10.75 9.91424 10.75 9.50003C10.75 9.08581 10.4142 8.75003 10 8.75003V10.25ZM5 11.75C4.58579 11.75 4.25 12.0858 4.25 12.5C4.25 12.9142 4.58579 13.25 5 13.25V11.75ZM8 13.25C8.41421 13.25 8.75 12.9142 8.75 12.5C8.75 12.0858 8.41421 11.75 8 11.75V13.25ZM14.042 16.643C14.042 17.0572 14.3778 17.393 14.792 17.393C15.2062 17.393 15.542 17.0572 15.542 16.643H14.042ZM15.542 9.50003C15.542 9.08581 15.2062 8.75003 14.792 8.75003C14.3778 8.75003 14.042 9.08581 14.042 9.50003H15.542ZM14.792 9.50003H14.042C14.042 9.71214 14.1318 9.91433 14.2892 10.0565C14.4466 10.1987 14.6568 10.2676 14.8679 10.2462L14.792 9.50003ZM14.792 8.21403H15.542C15.542 8.20559 15.5419 8.19716 15.5416 8.18873L14.792 8.21403ZM15.2992 6.96175L14.7786 6.42194V6.42194L15.2992 6.96175ZM16.569 6.50003L16.5167 7.2482C16.5341 7.24942 16.5515 7.25003 16.569 7.25003V6.50003ZM17.6 6.50003V7.25011L17.6115 7.24994L17.6 6.50003ZM19 7.85403L19.7499 7.8661C19.75 7.85757 19.75 7.84904 19.7499 7.84052L19 7.85403ZM17.743 9.20003L17.6797 8.45259L17.6671 8.45387L17.743 9.20003ZM5 7.25003H12V5.75003H5V7.25003ZM5 10.25H10V8.75003H5V10.25ZM5 13.25H8V11.75H5V13.25ZM15.542 16.643V9.50003H14.042V16.643H15.542ZM15.542 9.50003V8.21403H14.042V9.50003H15.542ZM15.5416 8.18873C15.5329 7.9306 15.634 7.68087 15.8199 7.50156L14.7786 6.42194C14.2869 6.89616 14.0194 7.55662 14.0424 8.23932L15.5416 8.18873ZM15.8199 7.50156C16.0058 7.32226 16.259 7.23018 16.5167 7.2482L16.6213 5.75185C15.9399 5.7042 15.2702 5.94771 14.7786 6.42194L15.8199 7.50156ZM16.569 7.25003H17.6V5.75003H16.569V7.25003ZM17.6115 7.24994C17.9582 7.2446 18.2439 7.52085 18.2501 7.86753L19.7499 7.84052C19.7287 6.66707 18.762 5.73205 17.5885 5.75011L17.6115 7.24994ZM18.2501 7.84195C18.2449 8.16176 17.9984 8.42572 17.6797 8.4527L17.8063 9.94735C18.8924 9.85541 19.7324 8.95593 19.7499 7.8661L18.2501 7.84195ZM17.6671 8.45387L14.7161 8.75387L14.8679 10.2462L17.8189 9.94618L17.6671 8.45387Z" fill="#000000"/>
                    </svg>
                    <div className="flex flex-col">
                        <p className ="text-base font-semibold">Create Music</p>
                        <p className="text-sm">text-to-music</p>
                    </div>
                </div>
            </div>
        )}
        </>

    )
} 
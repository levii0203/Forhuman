"use client"
import { useDispatch } from "react-redux"
import { toggleIs_premium } from "../../store/slice/user"
import PromptINput from "../input/promptInput"
import { setLoad, setUserPrompt } from "../../store/slice/chat";

const prompts = {

}

export default function Welcome(){
    const dispatch = useDispatch();
    const handler=()=>{
        dispatch(setLoad(false))
        dispatch(setUserPrompt(prompts['tetris'])) 
    }
    return (
        <div className="flex flex-col mt-[20vh] ml-[1%] items-center hit gap-8 w-full max-w-[1200px]">
            <p className="text-2xl sm:text-3xl lg:text-4xl flex text-zinc-600 sm:max-w-[1200px] w-full justify-center items-center font-semibold flex-wrap break-words animate-coolEntrance ">
                Good morning, Harsh Vardhan
            </p>
            <PromptINput/>
            <div className="flex flex-wrap items-center gap-2 justify-center w-full px-8">
                <div className="py-2 px-4 flex gap-1 rounded-xl border-[1px] border-[rgba(0,0,0,0.17)] hover:-translate-y-1 cursor-pointer hover:bg-gray-100 ">
                    <p className="text-[14px] font-medium">🧱 Tetris</p>
                </div>
                <div className="py-2 px-4 rounded-xl border-[1px] border-[rgba(0,0,0,0.17)] hover:-translate-y-1 cursor-pointer hover:bg-gray-100">
                    <p className="text-[14px] font-medium">♟️ Chess</p>
                </div>
                <div className="py-2 px-4 rounded-xl border-[1px] border-[rgba(0,0,0,0.17)] hover:-translate-y-1 cursor-pointer hover:bg-gray-100">
                    <p className="text-[14px] font-medium">🔢 Sudoku</p>
                </div>
                <div className="py-2 px-4 rounded-xl border-[1px] border-[rgba(0,0,0,0.17)] hover:-translate-y-1 cursor-pointer hover:bg-gray-100">
                    <p className="text-[14px] font-medium">🃏 Memory Game</p>
                </div>
            </div>  
        </div>
    )
}
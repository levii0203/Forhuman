"use client"
import { useState , useRef } from "react";
import { FiCamera } from "react-icons/fi";
import { IoMdArrowRoundUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh, setUserPrompt , addPrompt, setSent, setNext, setCreate, setLoad } from "../../store/slice/chat";
import { PiMicrophoneLight } from "react-icons/pi";
import { SlCloudUpload } from "react-icons/sl";
import { setOn } from "../../store/slice/camera";
import { deleteImage } from "../../store/slice/images";
import CreateMenu from "../create/menu";
import OpenRouter from "../../lib/openRouter";
import MusicGen from "../../lib/musicGen";
import { setAudioUrl, setAudioUrls } from "../../store/slice/audio";


export default function PromptINput(){

    const mediaRecorderRef = useRef(null);
    const prompt = useSelector((state)=>state.chat.userPrompt);
    const promptResponse = useSelector((state) => state.chat.promptResponse);
    const createIs = useSelector((state)=>state.chat.createIs);
    const model = useSelector((state)=>state.chat.model);
    const load = useSelector((state)=>state.chat.load)
    const dispatch = useDispatch();
    const [typing,setTyping] = useState(false);
    const create = useSelector((state)=>state.chat.create)
    const [files,setFiles] = useState([]);
    const dark = useSelector((state)=>state.dark.isDark);
    const fileInputRef = useRef(null);
    const images = useSelector((state)=>state.images.all);
    const [isRecording, setIsRecording] = useState(false);
    

    const isTyping=(value)=>{
        if(value==="" || value===null){
            setTyping(false);
        }
        else{
            dispatch(setUserPrompt(value));
            setTyping(true);
        }
    }

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };


  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
        setFiles((prevfiles) => [...prevfiles, file]);
        console.log(file.name);
        e.target.value = ''; 
    }
  };

  const handleFileDelete=async(key)=>{
    let newfiles = [];
    for( let i=0;i<files.length;i++){
        if(i!==key){
            newfiles.push(files[i]);
        }
    }
    await setFiles(newfiles);
  }

    const groq_assistant_response=async()=>{
        try{
            dispatch(setSent(true));
            if(files.length===0){
                const groq_response=await fetch("http://localhost:5000/chat.forhumanai",{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({text:prompt,files:files})
                })
                .catch(err=>console.log(err))
                .finally(()=>dispatch(setSent(false)))
                const data=await groq_response.json()
                console.log(data)
                dispatch(addPrompt({message:prompt,res:data}));
            }
            else{
                const formData = new FormData();
                formData.append("text", prompt);
                files.forEach((file) => formData.append("files", file));
                console.log(formData);
                const groq_response=await fetch("http://localhost:5000/chat.forhumanai/upload",{
                    method:'POST',
                    body:formData
                })
                .catch(err=>console.log(err))
                .finally(()=>dispatch(setSent(false)))
                const data=await groq_response.json()
                console.log(data)
                dispatch(addPrompt({message:prompt,res:data}));
            }

        }
        catch(error){
            console.log(error)
        }
        
        dispatch(setUserPrompt(""))
        document.getElementById("userInput").innerHTML=""
    }

    const modelHandler=async()=>{
        if(load){
            dispatch(setLoad(false))
        }
        if(model!==null & createIs==="Game"){
            dispatch(setSent(true));
            const openRouter_res = await OpenRouter(model,prompt)
            .finally(()=>dispatch(setSent(false)))
            dispatch(addPrompt({message:prompt,res: {
                response: [["none",openRouter_res]]
              }}))
        }
        else if(createIs==="Music"){
            dispatch(setSent(true));
            const musicgen_res = await fetch("https://api-inference.huggingface.co/models/facebook/musicgen-small", {
                method: "POST",
                headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                inputs: prompt
                }),
            })
            .finally(()=>dispatch(setSent(false)));
            console.log(musicgen_res)
            if (!musicgen_res.ok) {
                const errorData = await musicgen_res.json().catch(() => ({}));
                throw new Error(
                `API request failed: ${musicgen_res.status} - ${
                    errorData.error || musicgen_res.statusText
                }`
                );
            }
            const blob = await musicgen_res.blob();
            const url = URL.createObjectURL(blob);
            const audioArray = new Array(promptResponse?.length || 1).fill(null);
            dispatch(addPrompt({message:prompt,res:{
                response:[["none",null]]
            }}))
            audioArray.append(musicgen_res);
            dispatch(setAudioUrls(audioArray))
    
        }
        else {
            await groq_assistant_response();
        }
    }
    const startRecording = async () => {
        setIsRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        const chunks = [];
        mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorderRef.current.onstop = async () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('audio', blob, 'recording.webm');
          try {
            const response=await fetch("http://localhost:5000/chat.forhumanai/upload/audio",{
                method:'POST',
                body:formData
            })
            .catch(err=>console.log(err))
            const data=await response.json()
            console.log("audio response:",data)
          }
          catch(error){
            console.error(error)
          }
        };
    
        mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorderRef.current.stop();
    };
    

    return(
        <div className={`h-full m-0 border-[1px] border-[#B3B3B3] focus:outline-1 p-0 z-20 xl:w-[calc(60%)] md:max-w-[80%] w-[calc(90%)] rounded-[24px] ${dark ? 'bg-[#36383a]':'bg-white'} ${dark ? 'text-white':'text-black'} flex flex-col`}>
            { (files.length>0 || images.length>0) ? (
                    <div className="flex h-full w-full px-4 py-4 m-0 overflow-y-hidden overflow-x-auto items-center justify-start flex-row bg-transparent">
                        { files.map((file,index)=>(
                                <div key={index} className="flex flex-row p-4  bg-[#36383a] h-[64px] shadow-md rounded-[1.25rem] w-[calc(70%)] md:w-[calc(30%)] py-2 px-3 items-center justify-between ">
                                    <div className="flex w-[calc(70%)] h-full flex-col  gap-2px items-start justify-center">
                                        <label className="flex text-normal h-full w-[calc(90%)]  text-gray-100 truncate ">{file.name}</label>
                                        <p className="flex text-sm h-full w-[calc(90%)] text-gray-300 truncate">{file.type}</p>
                                    </div>
                                    <div className="flex h-full w-full items-center justify-end">
                                        <div className="flex p-2 h-fit w-fit hover:bg-zinc-600 rounded-full bg-transparent hover:cursor-pointer" onClick={()=>handleFileDelete(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="22px" height="22px" viewBox="0 0 32 32">
                                                <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                        ))} 
                        { images.map((image,index)=>(
                                <div key={index} className="flex flex-row p-4  bg-[#36383a] h-[64px] shadow-md rounded-[1.25rem] w-[calc(70%)] md:w-[calc(30%)] py-2 px-3 items-center justify-between ">
                                    <div className="flex w-[calc(70%)] h-full flex-col  gap-2px items-start justify-center">
                                        <label className="flex text-normal h-full w-[calc(90%)]  text-gray-100 truncate ">CamTaken{index+1}</label>
                                        <p className="flex text-sm h-full w-[calc(90%)] text-gray-300 truncate">image/jpeg</p>
                                    </div>
                                    <div className="flex h-full w-full items-center justify-end">
                                        <div className="flex p-2 h-fit w-fit hover:bg-zinc-600 rounded-full bg-transparent hover:cursor-pointer" onClick={()=>dispatch(deleteImage(index))}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="22px" height="22px" viewBox="0 0 32 32">
                                                <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                        ))} 
                    </div> 
                ):(
                   <></> 
                )
            }
            <input id="userInput" className="flex px-4 py-4 md:pt-[2%] md:pb-[1%] h-full m-0 w-full outline-none  break-all text-lg bg-transparent placeholder:font-thin placeholder:text-gray-400"  type="text" placeholder="Type, upload your message to forhumans"
            onChange={(e)=>{isTyping(e.target.value);}}></input>
            <div className="flex h-full px-4 py-2 mt-4 w-full">
                <div className="flex w-full gap-2 justify-start items-center ">
                    <div className={`${dark?'text-white':'text-black'} hover:text-black flex rounded-full hover:border-white items-center justify-center text-2xl h-full max-h-[38px] max-w-[38px] w-full xl:text-[28px]  md:py-2 border-spacing-1 md:px-2 ${dark?'border-zinc-600':'border-[#B3B3B3]'} border-[1px] md:text-2xl lg:text-2xl w-fit hover:bg-white cursor-pointer transition-transform hover:scale-105`} onClick={()=>dispatch(setOn(true))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="13" r="3" stroke="#1C274C" stroke-width="1.5"/>
                        <path d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z" stroke="#1C274C" stroke-width="1.5"/>
                        <path d="M19 10H18" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div className={`${dark?'text-white':'text-black'} hover:text-black flex rounded-full items-center justify-center h-full max-h-[38px] max-w-[38px] w-full hover:border-white  ${dark?'border-zinc-600':'border-[#B3B3B3]'} border-[1px] border-spacing-1 md:py-2 md:px-2 text-2xl md:text-2xl lg:text-3xl w-fit hover:bg-white cursor-pointer transition-transform hover:scale-105`} onClick={handleFileButtonClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        <path d="M13.5 3H12H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H7.5M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V9.75V12V19C19 20.1046 18.1046 21 17 21H16.5" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 21L12 13M12 13L14.5 15.5M12 13L9.5 15.5" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }} // Hide the default input
                        />
                    </div>
                    <div className={`flex h-full relative max-h-[40px] px-[12px] gap-[0.40vw] hover:bg-white hover:border-white items-center justify-center hover:text-black rounded-3xl border-[1px]  cursor-pointer transition-transform ${dark?'border-zinc-600':'border-[#B3B3B3]'} ${createIs!==null ?'bg-zinc-100':''}`} onMouseEnter={()=>dispatch(setCreate(true))}  >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none" onClick={()=>dispatch(setCreate(!create))}>
                        <path d="M10.5766 8.70419C11.2099 7.56806 11.5266 7 12 7C12.4734 7 12.7901 7.56806 13.4234 8.70419L13.5873 8.99812C13.7672 9.32097 13.8572 9.48239 13.9975 9.5889C14.1378 9.69541 14.3126 9.73495 14.6621 9.81402L14.9802 9.88601C16.2101 10.1643 16.825 10.3034 16.9713 10.7739C17.1176 11.2443 16.6984 11.7345 15.86 12.715L15.643 12.9686C15.4048 13.2472 15.2857 13.3865 15.2321 13.5589C15.1785 13.7312 15.1965 13.9171 15.2325 14.2888L15.2653 14.6272C15.3921 15.9353 15.4554 16.5894 15.0724 16.8801C14.6894 17.1709 14.1137 16.9058 12.9622 16.3756L12.6643 16.2384C12.337 16.0878 12.1734 16.0124 12 16.0124C11.8266 16.0124 11.663 16.0878 11.3357 16.2384L11.0378 16.3756C9.88634 16.9058 9.31059 17.1709 8.92757 16.8801C8.54456 16.5894 8.60794 15.9353 8.7347 14.6272L8.76749 14.2888C8.80351 13.9171 8.82152 13.7312 8.76793 13.5589C8.71434 13.3865 8.59521 13.2472 8.35696 12.9686L8.14005 12.715C7.30162 11.7345 6.88241 11.2443 7.02871 10.7739C7.17501 10.3034 7.78993 10.1643 9.01977 9.88601L9.33794 9.81402C9.68743 9.73495 9.86217 9.69541 10.0025 9.5889C10.1428 9.48239 10.2328 9.32097 10.4127 8.99812L10.5766 8.70419Z" fill="#1C274C"/>
                        <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z" fill="#1C274C"/>
                        <g opacity="0.5">
                        <path d="M18.5304 5.46967C18.8233 5.76256 18.8233 6.23744 18.5304 6.53033L18.1872 6.87359C17.8943 7.16648 17.4194 7.16648 17.1265 6.87359C16.8336 6.5807 16.8336 6.10583 17.1265 5.81293L17.4698 5.46967C17.7627 5.17678 18.2376 5.17678 18.5304 5.46967Z" fill="#1C274C"/>
                        <path d="M5.46967 5.46979C5.76256 5.17689 6.23744 5.17689 6.53033 5.46979L6.87359 5.81305C7.16648 6.10594 7.16648 6.58081 6.87359 6.87371C6.5807 7.1666 6.10583 7.1666 5.81293 6.87371L5.46967 6.53045C5.17678 6.23755 5.17678 5.76268 5.46967 5.46979Z" fill="#1C274C"/>
                        <path d="M6.87348 17.1266C7.16637 17.4195 7.16637 17.8944 6.87348 18.1873L6.53043 18.5303C6.23754 18.8232 5.76266 18.8232 5.46977 18.5303C5.17688 18.2375 5.17688 17.7626 5.46977 17.4697L5.81282 17.1266C6.10571 16.8337 6.58058 16.8337 6.87348 17.1266Z" fill="#1C274C"/>
                        <path d="M17.1265 17.1269C17.4194 16.834 17.8943 16.834 18.1872 17.1269L18.5302 17.4699C18.8231 17.7628 18.8231 18.2377 18.5302 18.5306C18.2373 18.8235 17.7624 18.8235 17.4695 18.5306L17.1265 18.1875C16.8336 17.8946 16.8336 17.4198 17.1265 17.1269Z" fill="#1C274C"/>
                        </g>
                        </svg>
                        {create ? (
                             <CreateMenu/>
                        ):(
                            <></>
                        )}
                        {createIs ? (
                        <p className="hidden md:flex font-normal  text-sm " >{createIs}</p>
                        ):(
                        <p className="hidden md:flex font-normal  text-sm " >Create</p>
                        )}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none"className="mt-[1.5px]" onClick={()=>dispatch(setCreate(!create))}>
                        <path d="M7 10L12 15L17 10" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className={`flex h-full max-h-[40px] px-[12px] gap-[0.40vw] hover:bg-white hover:border-white items-center justify-center hover:text-black rounded-3xl border-[1px]  cursor-pointer transition-transform hover:scale-105 ${dark?'border-zinc-600':'border-[#B3B3B3]'}`} onClick={()=>dispatch(setNext(true))}>
                       <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 64 64" aria-hidden="true" role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet"><path d="M39.195 37.311c-4.338-2.949-9.924-3.91-15.049-2.584c-1.35.365-.359 3.523.904 3.201c4.719-1.201 9.277.141 12.143 2.084c1.065.75 3.073-1.955 2.002-2.701" fill="#000000"/><path d="M49.685 17.038l-.139-.207l-.235-.083c-3.83-1.356-8.632-1.501-12.7-.363l-.244.068l-.152.202a8.193 8.193 0 0 0-1.675 4.974c0 4.559 3.709 8.268 8.268 8.268c4.56 0 8.27-3.709 8.27-8.268a8.25 8.25 0 0 0-1.393-4.591m-6.878 11.358a6.776 6.776 0 0 1-6.768-6.768c0-1.25.358-2.444 1.01-3.506c-.018.144-.051.281-.051.43a3.76 3.76 0 0 0 7.52 0c0-.477-.1-.927-.263-1.346c1.507.133 2.975.422 4.315.872a6.733 6.733 0 0 1 1.006 3.55a6.776 6.776 0 0 1-6.769 6.768" fill="#000000"/><path d="M29.461 21.629a8.228 8.228 0 0 0-1.392-4.591l-.139-.207l-.235-.083c-3.83-1.356-8.632-1.501-12.7-.363l-.244.068l-.153.202a8.193 8.193 0 0 0-1.675 4.974c0 4.559 3.709 8.268 8.268 8.268c4.56-.001 8.27-3.709 8.27-8.268m-8.27 6.767a6.776 6.776 0 0 1-6.768-6.768c0-1.25.358-2.444 1.01-3.506c-.018.144-.051.281-.051.43a3.76 3.76 0 0 0 7.52 0c0-.477-.1-.927-.263-1.346c1.507.133 2.975.422 4.315.872a6.733 6.733 0 0 1 1.006 3.55c.001 3.732-3.035 6.768-6.769 6.768" fill="#000000"/><path d="M32 2C16.531 2 4 14.533 4 30a27.83 27.83 0 0 0 3.895 14.209c-.392.896-.744 1.848-.791 3.047c-.01.203-.023.422-.037.654c-.135 2.057-.334 5.166 2.416 9.063c1.775 2.512 4.531 4.162 7.969 4.766c1.219.213 2.467.295 3.822.25c2.217-.076 3.773-.156 4.625-1.703c.722-1.309-.109-2.135.507-2.856A28.16 28.16 0 0 0 32 58c15.469 0 28-12.533 28-28S47.469 2 32 2m-6.989 55.969c.277 1.699-.689 3.305-7.216 2.127c-10.741-1.938-10.012-12.1-8.277-15.761c1.274-2.689 1.08-3.833.344-7.171c-.669-3.029 5.053-1.658 5.217 1.974c.121 2.694-.916 4.068.375 5.253c2.886 2.65 11.213 1.198 16.842.004c2.408-.511 3.646 1.931 1.861 3.175c-1.908 1.333-4.139 1.874-7.439 2.116c-1.723.125.221.68-.049 2.316c-.147.898-1.088.867-1.052 1.801c.019.497 1.044 1.02.347 2.27c-.207.373-1.133.801-.953 1.896M32 55.5c-1.536 0-3.037-.147-4.499-.41a2.734 2.734 0 0 0-.278-.83c-.377-.738 1.498-1.5.736-3.482c2.857-.469 4.982-1.02 6.951-2.139c2.117-1.203 2.188-2.514 2.043-3.188c-.246-1.123-1.404-2.049-2.887-2.309a4.162 4.162 0 0 0-1.686.037c-3.125.758-10.604 1.779-14.387 1.115c-1.063-.188-1.41-.441-1.508-.541c-.549-.551-.445-1.605-.176-3.785c.33-2.68-2.078-5.537-4.213-5.912l-.137-.023c-1.178-.148-2.229.191-2.883.934c-.732.826-.896 2.061-.453 3.383c.349 1.039.428 1.873.36 2.615A25.365 25.365 0 0 1 6.5 30c0-7.028 2.858-13.401 7.473-18.018c.079.022.152.022.213-.015a13.284 13.284 0 0 1 11.256-.983c.512.198 1.328-1.683.703-1.92a15.299 15.299 0 0 0-7.538-.752A25.343 25.343 0 0 1 32 4.5c7.063 0 13.464 2.889 18.087 7.544a15.325 15.325 0 0 0-12.929 1.157c-.572.342.557 2.049 1.029 1.768a13.284 13.284 0 0 1 11.256-.986c.429.167 1.06-1.114.89-1.68C54.765 16.893 57.5 23.131 57.5 30c0 14.061-11.439 25.5-25.5 25.5" fill="#000000"/></svg>
                        <p className=" hidden md:flex font-normal text-sm ">What's next</p>
                    </div>
                </div>
                <div className="flex max-w-[20%] w-full mb-2 justify-end">
                    { typing ? (
                        <div className={`flex rounded-full z-20 items-center justify-center text-2xl h-fit py-[6px] border-[1px] border-[#B3B3B3]  px-[6px]  md:h-12 md:w-12 hover:bg-opacity-65 hover:bg-slate-50 bg-white text-black font-semibold cursor-pointer  transition-transform hover:scale-110`}
                        onClick={modelHandler}>
                            < IoMdArrowRoundUp/>
                        </div>

                    ):(
                        <>
                        { files.length>0 ? (
                             <div className={`flex rounded-full z-20 items-center justify-center text-2xl py-[6px] px-[6px] border-[1px] border-[#B3B3B3]  h-fit md:h-12 md:w-12 bg-opacity-65 bg-slate-50 text-black font-semibold cursor-pointer  transition-transform`}>
                                 < IoMdArrowRoundUp/>
                             </div>
                        ):(
                        <>
                            {isRecording ? (
                                <div className="flex rounded-full z-20 border-[1px] border-[#B3B3B3] items-center justify-center text-2xl h-fit py-[6px] px-[6px] md:h-12 md:w-12 bg-white text-black font-bold cursor-pointer transition-transform hover:scale-110 hover:bg-opacity-65 hover:bg-slate-50 " onClick={stopRecording}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none">
                                        <path d="M17.0005 11.24V13C17.0005 14.3261 16.4737 15.5978 15.536 16.5355C14.5983 17.4732 13.3266 18 12.0005 18C11.4846 17.9975 10.972 17.9166 10.4805 17.76" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 16C7.35089 15.1345 7 14.0819 7 13V7C7 5.67392 7.52677 4.40216 8.46445 3.46448C9.40213 2.5268 10.6739 2 12 2C13.3261 2 14.5978 2.5268 15.5355 3.46448C16.4732 4.40216 17 5.67392 17 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.21081 18.84C3.81268 17.216 3.04593 15.1429 3.0508 13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M21.0007 13C20.9995 14.5822 20.5812 16.1361 19.788 17.5051C18.9948 18.8741 17.8547 20.0098 16.4827 20.7977C15.1107 21.5857 13.5551 21.9979 11.973 21.993C10.3908 21.9882 8.83786 21.5664 7.4707 20.77" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M22 2L2 22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                </div>
                            ):(
                                <div ref={mediaRecorderRef} className="flex  border-[1px] border-[#B3B3B3] rounded-full z-20 items-center justify-center text-2xl h-fit py-[6px] px-[6px] md:h-12 md:w-12 bg-white text-black font-bold cursor-pointer transition-transform hover:scale-110 hover:bg-opacity-65 hover:bg-slate-50 " onClick={startRecording}>
                                    <PiMicrophoneLight/>
                                </div>
                            )}
                        </>
                    )}
                    </>
                    )}
                </div>
            </div>
        </div>
    )
}

// uplaod-//text-2xl md:text-2xl lg:text-3xl

"use client"
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar} from "../../store/slice/sidebar";
import { toggleDark } from "../../store/slice/dark";
import { allDownloadFalse } from "../../store/slice/chat";
import { toggleIs_premium } from "../../store/slice/user";

export default function NavB() {
    
    const dispatch = useDispatch();
    const dark = useSelector((state)=>state.dark.isDark);
    const download = useSelector((state)=>state.chat.download);
    const premium = useSelector((state)=>state.user.is_premium)

    return (
        <div className={`flex mt-2 flex-row z-100 sticky bg-opacity-30 sm:bg-opacity-100 sm:relative top-0 left-0 h-[calc(8%)] md:px-8 px-4 w-full justify-between items-center bg-white`}>
            <div className="flex w-full gap-[12px] justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" className="cursor-pointer" onClick={()=>dispatch(toggleSidebar())}>
                <path d="M2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11V13C22 16.7712 22 18.6569 20.8284 19.8284C19.6569 21 17.7712 21 14 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V11Z" stroke="#1C274C" stroke-width="1.5"/>
                <path d="M15 21L15 3" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <div className="border-[#B3B3B3] border-[1px] flex items-center justify-center gap-2 md:gap-[14px] sm:py-2 pl-2 pr-1 py-1 sm:pl-4 cursor-pointer sm:pr-2 rounded-3xl">
                    <p className="text-sm sm:text-base flex text-[#6723B0]">ForhumansAI</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                    <path d="M7 10L12 15L17 10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="flex w-full items-center gap-2 sm:gap-4 justify-end">
                    <div className="rounded-full flex border-[1px] border-[rgba(0,0,0,0.17)] cursor-pointer border-opacity-35 h-8 w-8 sm:h-10 sm:w-10 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  className="sm:h-[22px] h-[20px] w-[20px] sm:w-[22px]" viewBox="0 0 24 24" version="1.1">
                                <title>ic_fluent_dark_theme_24_filled</title>
                                <desc>Created with Sketch.</desc>
                                <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="ic_fluent_dark_theme_24_filled" fill="#212121" fill-rule="nonzero">
                                        <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20 L12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z" id="🎨-Color">

                            </path>
                                    </g>
                                </g>
                            </svg>
                    </div>
                <div className="rounded-full flex border-[1px] border-opacity-35 h-8 w-8 sm:h-10 sm:w-10  items-center cursor-pointer justify-center mr-[3%] border-[rgba(0,0,0,0.17)]">
                           <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="sm:h-[20px] h-[18px] w-[18px]  sm:w-[20px]" viewBox="-0.5 0 48 48" version="1.1">
                            
                            <title>Google-color</title>
                            <desc>Created with Sketch.</desc>
                            <defs>

                        </defs>
                            <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                    <g id="Google" transform="translate(401.000000, 860.000000)">
                                        <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05">

                        </path>
                                        <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335">

                        </path>
                                        <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853">

                        </path>
                                        <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4">

                        </path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                </div>
                
            </div>
        </div>
    );
}

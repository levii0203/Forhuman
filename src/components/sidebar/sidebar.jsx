
import { useDispatch, useSelector } from "react-redux";
import { setLoad } from "../../store/slice/chat";

export default function Sidebar(){
    const dark = useSelector((state)=>state.dark.isDark)
    const sidebar = useSelector((state)=>state.sidebar.is);
    const dispatch = useDispatch()
    return (
        <div className={`w-full  h-full m-0 max-w-[260px] border-r-[1px] border-zinc-200 sm:flex hidden  flex-col py-4 transform transition-transform duration-500 ease-in-out ${sidebar ? 'translate-x-0' : '-translate-x-full'} `}>
            <div className="h-full flex-col flex w-full m-0">
            <div className="mt-[5%] w-full flex gap-2 flex-col items-center justify-center">
            <div className="h-14 w-14 rounded-lg flex">
                <img src="/logo.jpg" alt="logo" className="rounded-lg h-full w-full"/>
            </div>
            <p className="text-[16px]  text-[#6723B0] flex font-semibold">Forhumans</p>
            </div>
            <div className="flex w-full mt-4">
            <div className="flex items-center w-full gap-3 mx-[6%] py-2 px-2 cursor-pointer border-[1px] rounded-xl border-white hover:border-[rgba(0,0,0,0.17)]" onClick={()=>dispatch(setLoad(true))}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                <g id="Communication / Chat_Circle_Add">
                <path id="Vector" d="M12 15V12M12 12V9M12 12H9M12 12H15M12.0001 21C10.365 21 8.83174 20.5639 7.51025 19.8018C7.3797 19.7265 7.31434 19.6888 7.25293 19.6719C7.19578 19.6561 7.14475 19.6507 7.08559 19.6548C7.02253 19.6591 6.9573 19.6808 6.82759 19.7241L4.51807 20.4939L4.51625 20.4947C4.02892 20.6572 3.7848 20.7386 3.62256 20.6807C3.4812 20.6303 3.36979 20.5187 3.31938 20.3774C3.26157 20.2152 3.34268 19.9719 3.50489 19.4853L3.50586 19.4823L4.27468 17.1758L4.27651 17.171C4.31936 17.0424 4.34106 16.9773 4.34535 16.9146C4.3494 16.8554 4.34401 16.804 4.32821 16.7469C4.31146 16.6863 4.27448 16.6221 4.20114 16.495L4.19819 16.4899C3.43604 15.1684 3 13.6351 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9707 21 12.0001 21Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                </svg> 
                <p className="text-[20px] flex font-[200px]">New chat</p>
            </div>
            </div>
            <div className="flex w-full">
                <div className="flex items-center w-full gap-3 mx-[6%] py-2 px-2 cursor-pointer border-[1px] rounded-xl border-white hover:border-[rgba(0,0,0,0.17)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#1C274C" stroke-width="1.5"/>
                    </svg>
                    <p className="text-[20px] flex font-[200px]">Starred messages</p>
                </div>
            </div>
            <div className="flex w-full justify-between">
                <div className="flex items-center w-full justify-between mx-[6%] py-2 px-2 cursor-pointer border-[1px] rounded-xl border-white hover:border-[rgba(0,0,0,0.17)]">
                    <div className="flex flex-row gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8V12L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.60414 5.60414L5.07381 5.07381V5.07381L5.60414 5.60414ZM4.33776 6.87052L3.58777 6.87429C3.58984 7.28556 3.92272 7.61844 4.33399 7.62051L4.33776 6.87052ZM6.87954 7.6333C7.29375 7.63539 7.63122 7.30129 7.6333 6.88708C7.63538 6.47287 7.30129 6.1354 6.88708 6.13332L6.87954 7.6333ZM5.07496 4.3212C5.07288 3.90699 4.73541 3.5729 4.3212 3.57498C3.90699 3.57706 3.5729 3.91453 3.57498 4.32874L5.07496 4.3212ZM3.82661 10.7849C3.88286 10.3745 3.59578 9.99627 3.1854 9.94002C2.77503 9.88377 2.39675 10.1708 2.3405 10.5812L3.82661 10.7849ZM18.8622 5.13777C15.042 1.31758 8.86873 1.27889 5.07381 5.07381L6.13447 6.13447C9.33358 2.93536 14.5571 2.95395 17.8016 6.19843L18.8622 5.13777ZM5.13777 18.8622C8.95796 22.6824 15.1313 22.7211 18.9262 18.9262L17.8655 17.8655C14.6664 21.0646 9.44291 21.0461 6.19843 17.8016L5.13777 18.8622ZM18.9262 18.9262C22.7211 15.1313 22.6824 8.95796 18.8622 5.13777L17.8016 6.19843C21.0461 9.44291 21.0646 14.6664 17.8655 17.8655L18.9262 18.9262ZM5.07381 5.07381L3.80743 6.34019L4.86809 7.40085L6.13447 6.13447L5.07381 5.07381ZM4.33399 7.62051L6.87954 7.6333L6.88708 6.13332L4.34153 6.12053L4.33399 7.62051ZM5.08775 6.86675L5.07496 4.3212L3.57498 4.32874L3.58777 6.87429L5.08775 6.86675ZM2.3405 10.5812C1.93907 13.5099 2.87392 16.5984 5.13777 18.8622L6.19843 17.8016C4.27785 15.881 3.48663 13.2652 3.82661 10.7849L2.3405 10.5812Z" fill="#1C274C"/>
                    </svg>
                    <p className="text-[20px] flex font-[200px]">History</p>
                    </div>
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.989 15.4905L19.5 19.0015" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex mt-2 w-full">
                <div className="flex items-center w-full gap-3 mx-[8%] py-2 px-4 cursor-pointer border-[1px] rounded-xl  border-[rgba(0,0,0,0.26)]">
                    <input placeholder="Search..." className="outline-0 w-full"/>
                </div>
            </div>
            </div>
            <div className="flex mb-[4%] justify-center items-end">
                <div className="bg-[rgba(236,212,173,1)]  border-[1px] border-[rgba(0,0,0,0.17)] flex ml-[8%] mr-[6%] w-full px-4 py-2 rounded-xl">
                    <p className="font-[200px] text-[20px] flex">Premium plan</p>
                </div>
            </div>
        </div>
        )
}

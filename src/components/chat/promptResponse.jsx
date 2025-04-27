"use client"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addDownload, allDownloadFalse, setDownload } from "../../store/slice/chat";
import RenderResponse from "./render";
import jsPDF from 'jspdf';
import { Document, Paragraph, Packer, TextRun } from 'docx';
import { saveAs } from 'file-saver';





export default function PromptResponseView({userPrompt,index,chatBoxRef}){

    const dropdownRef = useRef(null);
    const contentRef = useRef(null);
    const dark = useSelector((state)=>state.dark.isDark)
    const download = useSelector((state)=>state.chat.download)
    const premium = useSelector((state)=>state.user.is_premium)
    const load = useRef(false);
    const dispatch = useDispatch();
    const [starSvg,setStarSvg] = useState({
        fill:'none',
        stroke:'rgb(156 163 175/1)'
    })
    const [starred,setStarred] = useState(false);
    const [downloadMenuDirection, setDownloadMenuDirection] = useState(false);
    const [copy,setCopy] = useState(false);


    const toggleStarSvg =()=>{
        if(!starred){
            setStarSvg({
                fill:'rgb(0 0 0 0)',
                stroke:'rgb(0 0 0 0)'
            })
            setStarred(true);
        }
        else{
            setStarSvg({
                fill:'none',
                stroke:'rgb(156 163 175/1)'
            })
            setStarred(false);
        }
    }
    const DownloadArray=()=>{
        dispatch(addDownload(false));
    }

    const DownloadMenuHandler=()=>{
        let copy = [...download];
        for(let i=0;i<copy.length;i++){
            if(i!==index){
                copy[i] = false;
            }
            else{
                copy[i] = !copy[i];
            }
        }
        dispatch(setDownload(copy));
    }

  
    const handleCopy=()=>{
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(userPrompt)
              .then(() => {
                setCopy(true);
                setTimeout(() => {setCopy(false)}, 1500);
              })
              .catch((err) => {
                console.error('Clipboard API failed: ', err);
              });
          }
    }

    useEffect(() => {
        if (download[index] && dropdownRef.current && contentRef.current && chatBoxRef.current) {
            const chatBoxRect = chatBoxRef.current.getBoundingClientRect();
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const contentHeight = contentRef.current.offsetHeight;
            const spaceBelow = chatBoxRect.bottom - dropdownRect.bottom;
            const spaceAbove = dropdownRect.top - chatBoxRect.top;
          if (spaceBelow < contentHeight&& spaceAbove > spaceBelow) {
            setDownloadMenuDirection(true);
          } else {
            console.log(contentHeight-30)
            setDownloadMenuDirection(false);
          }
        }
      }, [download[index],chatBoxRef]);

    useEffect(()=>{
        if(!load.current){
            DownloadArray();
            load.current = true;
        }
    },[])

    const handleDownload = () => {
        if (!userPrompt) return; // Don’t download if there’s nothing there
    
        // Turn the response into a text file
        const blob = new Blob([userPrompt], { type: 'text/plain;charset=utf-8' });
    
        // Make a temporary URL for the file
        const url = URL.createObjectURL(blob);
    
        // Create a hidden link to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `chatbot_response_${new Date().toISOString().replace(/:/g, '-')}.txt`; // Unique name with timestamp
        document.body.appendChild(a);
        a.click();
    
        // Clean up after
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };


      const handlePdfDownload = (text) => {
        if (!text) return;
    
        // Create a new jsPDF instance
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
    
        // Add text to the PDF (basic formatting)
        doc.setFontSize(14);
        doc.text(text, 10, 10); // Position text at (10mm, 10mm)
    
        // Generate filename with timestamp
        const filename = `transcription_${new Date().toISOString().replace(/:/g, '-')}.pdf`;
    
        // Trigger download
        doc.save(filename);
      };

      const handleWordDownload = (text) => {
        if (!text) return;
    
        // Create a new Document
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: [
                new Paragraph({
                  children: [new TextRun(text)],
                }),
              ],
            },
          ],
        });


    
        // Generate filename with timestamp
        const filename = `transcription_${new Date().toISOString().replace(/:/g, '-')}.docx`;
    
        // Generate and save the .docx file
        Packer.toBlob(doc).then((blob) => {
          saveAs(blob, filename);
        });
      };

    return (
        <div className="flex h-fit pt-[2vh] w-full items-start flex-col  ">
            <div className="w-full flex flex-col">
                <div className="flex justify-start h-fit flex-row gap-[2vh] w-full py-[1vh]">
                    <div className={`flex rounded-full h-[3vh] w-[3vh] ${dark ? 'bg-zinc-600':'bg-[#eae5eb]'}`}></div>
                </div>
                <div className="flex w-full justify-start">
                <div className={`flex items-start justify-start flex-col gap-0 relative break-all p-2 sm:p-4 sm:max-w-[calc(98%)] text-base sm:text-normal w-full rounded-xl 
                 break-words shadow-sm max-w-[95vw] ${dark ? 'text-white' : 'text-gray-800'} ${dark ? 'bg-[#1d1e20]' : 'bg-[rgb(252,250,250)]'}`}>
                     <RenderResponse response={userPrompt}/>
                {/*<p className={`flex flex-wrap xl:text-lg h-full lg:text-base break-words break-before-right break-inside-auto font-normal whitespace-pre-wrap ${dark ? 'text-white' : 'text-gray-800'}`}>
                   
                </p>*/}
                </div>
                </div>
                <div className="flex flex-row items-center gap-[0.4vw] md:gap-[0.4vh] justify-start py-1 px-1 text-gray-400">
                    <div className={`hover:cursor-pointer py-2 px-2 rounded-full flex ${dark?'hover:bg-gray-100 hover:bg-opacity-10':'hover:bg-gray-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 50 50" strokeWidth="2" stroke="rgb(156 163 175/1)">
                        <path d="M 25 5 C 13.964844 5 5 13.964844 5 25 C 4.996094 25.359375 5.183594 25.695313 5.496094 25.878906 C 5.808594 26.058594 6.191406 26.058594 6.503906 25.878906 C 6.816406 25.695313 7.003906 25.359375 7 25 C 7 15.046875 15.046875 7 25 7 C 31.246094 7 36.726563 10.179688 39.957031 15 L 33 15 C 32.640625 14.996094 32.304688 15.183594 32.121094 15.496094 C 31.941406 15.808594 31.941406 16.191406 32.121094 16.503906 C 32.304688 16.816406 32.640625 17.003906 33 17 L 43 17 L 43 7 C 43.003906 6.730469 42.898438 6.46875 42.707031 6.277344 C 42.515625 6.085938 42.253906 5.980469 41.984375 5.984375 C 41.433594 5.996094 40.992188 6.449219 41 7 L 41 13.011719 C 37.347656 8.148438 31.539063 5 25 5 Z M 43.984375 23.984375 C 43.433594 23.996094 42.992188 24.449219 43 25 C 43 34.953125 34.953125 43 25 43 C 18.753906 43 13.269531 39.820313 10.042969 35 L 17 35 C 17.359375 35.007813 17.695313 34.816406 17.878906 34.507813 C 18.058594 34.195313 18.058594 33.808594 17.878906 33.496094 C 17.695313 33.1875 17.359375 32.996094 17 33 L 8.445313 33 C 8.316406 32.976563 8.1875 32.976563 8.058594 33 L 7 33 L 7 43 C 6.996094 43.359375 7.183594 43.695313 7.496094 43.878906 C 7.808594 44.058594 8.191406 44.058594 8.503906 43.878906 C 8.816406 43.695313 9.003906 43.359375 9 43 L 9 36.984375 C 12.648438 41.847656 18.460938 45 25 45 C 36.035156 45 45 36.035156 45 25 C 45.003906 24.730469 44.898438 24.46875 44.707031 24.277344 C 44.515625 24.085938 44.253906 23.980469 43.984375 23.984375 Z"></path>
                        </svg>
                    </div>
                    <div className={`hover:cursor-pointer py-2 px-2 rounded-full flex  ${dark?'hover:bg-gray-100 hover:bg-opacity-10':'hover:bg-gray-100'}`} onClick={handleCopy}>
                        { copy? (
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="rgb(156 163 175/1)" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z" fill="rgb(156 163 175/1)"/>
                            <path d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1V12.9C16 9.4 14.6 8 11.1 8ZM12.29 13.65L8.58 17.36C8.44 17.5 8.26 17.57 8.07 17.57C7.88 17.57 7.7 17.5 7.56 17.36L5.7 15.5C5.42 15.22 5.42 14.77 5.7 14.49C5.98 14.21 6.43 14.21 6.71 14.49L8.06 15.84L11.27 12.63C11.55 12.35 12 12.35 12.28 12.63C12.56 12.91 12.57 13.37 12.29 13.65Z" fill="rgb(156 163 175/1)"/>
                            </svg>
                        ):(
                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg" >
                            <g clip-path="url(#clip0_429_11155)">
                            <path d="M16 3H4V16"  stroke-width="2" stroke="rgb(156 163 175/1)" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 7H20V19C20 20.1046 19.1046 21 18 21H10C8.89543 21 8 20.1046 8 19V7Z" stroke="rgb(156 163 175/1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_429_11155">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                        )}
                    </div>
                    <div className={`hover:cursor-pointer py-2 px-2 rounded-full flex  ${dark?'hover:bg-gray-100 hover:bg-opacity-10':'hover:bg-gray-100'}`} onClick={toggleStarSvg}>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill={starSvg.fill} xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"  stroke={starSvg.stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="flex h-full w-fit relative flex-col items-center justify-center " ref={dropdownRef} >
                    {(download[index] && downloadMenuDirection)? (
                        <div className={`flex bottom-full w-[176px] mb-[1vh] h-fit py-2 absolute  ${dark ? 'border-zinc-500':'border-zinc-200'} ${dark ? 'bg-[#1d1e20]':'bg-white'} z-20 rounded-md  px-1 border-2 items-center justify-center flex-col`} onMouseLeave={()=>dispatch(allDownloadFalse())} ref={contentRef}>
                                <div className="flex flex-row gap-[6px] items-center justify-start w-full py-[0.5vh] px-[1vh] rounded-md hover:bg-gray-100 hover:cursor-pointer">
                                    <svg fill="rgb(161 161 170/1)" width="18px" height="18px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1129.432 113v1694.148H936.638l-451.773-451.773h-315.45C76.01 1355.375 0 1279.365 0 1185.96V734.187c0-93.404 76.01-169.414 169.415-169.414h315.45L936.638 113h192.794Zm-112.943 112.943h-33.093l-418.68 418.68v630.901l418.68 418.68h33.093V225.944Zm655.488 135.114C1831.904 521.097 1920 733.77 1920 960.107c0 226.226-88.096 438.898-248.023 598.938l-79.851-79.85c138.694-138.695 214.93-323.018 214.93-519.087 0-196.183-76.236-380.506-214.93-519.2Zm-239.112 239.745c95.663 97.018 148.294 224.644 148.294 359.272s-52.631 262.254-148.294 359.272l-80.529-79.286c74.769-75.785 115.88-175.175 115.88-279.986 0-104.811-41.111-204.201-115.88-279.986Zm-981.092 76.914H169.415c-31.06 0-56.472 25.3-56.472 56.471v451.773c0 31.172 25.412 56.472 56.472 56.472h282.358V677.716Z" fill-rule="evenodd"/>
                                    </svg>
                                    <p className="text-sm">Audio format</p>
                                </div>
                                <div className={`flex flex-row  gap-[5px] items-center justify-start w-full py-[0.7vh] px-[0.5vh] rounded-md ${dark?'hover:bg-slate-100 hover:bg-opacity-10': 'hover:bg-gray-100'} hover:cursor-pointer`} onClick={handleDownload}>
                                    <svg width="22px" height="22px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="rgb(161 161 170/1)" strokeWidth="2"><polyline points="44 8 44 16 52 16"/><polygon points="52 16 44 8 12 8 12 56 52 56 52 16"/><line x1="20" y1="20" x2="28" y2="20"/><line x1="20" y1="28" x2="44" y2="28"/><line x1="36" y1="36" x2="20" y2="36"/><line x1="20" y1="44" x2="44" y2="44"/></svg>
                                    <p className="text-sm">Text format</p>
                                </div>
                                <div className="flex gap-[5px]  items-center justify-start w-full py-[0.7vh] px-[0.7vh] rounded-md hover:bg-gray-100 hover:cursor-pointer" onClick={handlePdfDownload(userPrompt)}>
                                    <svg width="18px" height="18px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 6.5V6H2V6.5H2.5ZM6.5 6.5V6H6V6.5H6.5ZM6.5 10.5H6V11H6.5V10.5ZM13.5 3.5H14V3.29289L13.8536 3.14645L13.5 3.5ZM10.5 0.5L10.8536 0.146447L10.7071 0H10.5V0.5ZM2.5 7H3.5V6H2.5V7ZM3 11V8.5H2V11H3ZM3 8.5V6.5H2V8.5H3ZM3.5 8H2.5V9H3.5V8ZM4 7.5C4 7.77614 3.77614 8 3.5 8V9C4.32843 9 5 8.32843 5 7.5H4ZM3.5 7C3.77614 7 4 7.22386 4 7.5H5C5 6.67157 4.32843 6 3.5 6V7ZM6 6.5V10.5H7V6.5H6ZM6.5 11H7.5V10H6.5V11ZM9 9.5V7.5H8V9.5H9ZM7.5 6H6.5V7H7.5V6ZM9 7.5C9 6.67157 8.32843 6 7.5 6V7C7.77614 7 8 7.22386 8 7.5H9ZM7.5 11C8.32843 11 9 10.3284 9 9.5H8C8 9.77614 7.77614 10 7.5 10V11ZM10 6V11H11V6H10ZM10.5 7H13V6H10.5V7ZM10.5 9H12V8H10.5V9ZM2 5V1.5H1V5H2ZM13 3.5V5H14V3.5H13ZM2.5 1H10.5V0H2.5V1ZM10.1464 0.853553L13.1464 3.85355L13.8536 3.14645L10.8536 0.146447L10.1464 0.853553ZM2 1.5C2 1.22386 2.22386 1 2.5 1V0C1.67157 0 1 0.671573 1 1.5H2ZM1 12V13.5H2V12H1ZM2.5 15H12.5V14H2.5V15ZM14 13.5V12H13V13.5H14ZM12.5 15C13.3284 15 14 14.3284 14 13.5H13C13 13.7761 12.7761 14 12.5 14V15ZM1 13.5C1 14.3284 1.67157 15 2.5 15V14C2.22386 14 2 13.7761 2 13.5H1Z" fill="rgb(161 161 170/1)"/>
                                    </svg>
                                    <p className="text-sm">PDF format</p>
                                </div>
                                <div className="flex flex-row gap-[6px] items-center justify-start w-full py-[0.7vh] px-[0.5vh] rounded-md hover:bg-gray-100 hover:cursor-pointer" onClick={handleWordDownload(userPrompt)}>
                                    <svg fill="rgb(161 161 170/1)" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke="1" d="M29.121 8.502v-3.749h-18.745v3.749zM29.121 15.063v-4.686h-13.121v4.686zM29.121 21.623v-4.686h-13.121v4.686zM29.121 27.247v-3.749h-18.745v3.749zM8.546 15.004l1.802 5.917h2.049l1.962-9.842h-2.063l-1.171 5.815-1.656-5.623h-1.742l-1.757 5.652-1.172-5.842h-2.154l1.962 9.84h2.051zM29.751 2.879c0.686 0.003 1.242 0.558 1.245 1.244v23.753c-0.003 0.686-0.558 1.242-1.244 1.245h-20.005c-0.686-0.003-1.242-0.558-1.245-1.244v-4.379h-6.253c-0.005 0-0.011 0-0.016 0-0.338 0-0.644-0.14-0.862-0.366l-0-0c-0.226-0.218-0.366-0.524-0.366-0.862 0-0.006 0-0.011 0-0.017v0.001-12.506c-0-0.005-0-0.011-0-0.016 0-0.338 0.14-0.644 0.366-0.862l0-0c0.218-0.226 0.524-0.366 0.862-0.366 0.006 0 0.011 0 0.017 0h6.252v-4.379c0.003-0.686 0.559-1.242 1.244-1.245h0z"></path>
                                    </svg>
                                    <p className="text-sm">Word format</p>
                                </div>
                                <div className="flex items-center justify-start w-full py-[1vh] px-[1vh] rounded-md hover:bg-gray-100 hover:cursor-pointer">
                                    <p className="text-sm">Power-Point format</p>
                                </div>
                                <div className="flex items-center justify-start w-full py-[1vh] px-[1vh] rounded-md hover:bg-gray-100 hover:cursor-pointer">
                                    <p className="text-sm">Power-Point format</p>
                                </div>
                              
                                {premium?(<>
                                <div className="flex flex-row  gap-[4px] items-center justify-start w-full py-[0.7vh] px-[0.5vh] rounded-md hover:bg-gray-100 hover:cursor-pointer">
                                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path  d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z" stroke='rgb(161 161 170/1)' stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p className="text-sm">Image format</p>
                                </div>
                             
                               
                                </>):(<></>)}
                        </div>
                        ):(<></>)}
                        <div className={`flex flex-row gap-[0.5vh] rounded-3xl py-[0.5vh] px-[0.9vh] items-center justify-center border-[1px] ${dark ? 'border-zinc-500':'border-gray-300'} ${dark ? 'hover:bg-gray-100 hover:bg-opacity-10 hover:text-gray-300':'hover:bg-gray-100'} hover:text-black hover:cursor-pointer hover:fill-black `} /*onMouseEnter={DownloadMenuHandler*/ onClick={DownloadMenuHandler} >
                            <p className="flex text-sm font-normal"> Download this info as</p>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill='none' xmlns="http://www.w3.org/2000/svg" className="flex pt-[0.125rem]">
                            <path id="down" d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"  fill="rgb(209 213 219/1)" className="hover:fill-black"/>
                            </svg>
                        </div>
                        {(download[index] && !downloadMenuDirection)? (
                        <div className={`flex top-full w-[176px] mt-[1vh] h-fit py-2 absolute ${dark ? 'border-zinc-500':'border-zinc-200'} ${dark ? 'bg-[#1d1e20]':'bg-white'} z-20 rounded-md  px-1 border-2 items-center justify-center flex-col`} onMouseLeave={()=>dispatch(allDownloadFalse())} ref={contentRef}>
                                <div className="flex flex-row gap-[6px] items-center justify-start w-full py-[0.5vh] px-[1vh] rounded-md hover:bg-gray-100 hover:cursor-pointer">
                                    <svg fill="rgb(161 161 170/1)" width="18px" height="18px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1129.432 113v1694.148H936.638l-451.773-451.773h-315.45C76.01 1355.375 0 1279.365 0 1185.96V734.187c0-93.404 76.01-169.414 169.415-169.414h315.45L936.638 113h192.794Zm-112.943 112.943h-33.093l-418.68 418.68v630.901l418.68 418.68h33.093V225.944Zm655.488 135.114C1831.904 521.097 1920 733.77 1920 960.107c0 226.226-88.096 438.898-248.023 598.938l-79.851-79.85c138.694-138.695 214.93-323.018 214.93-519.087 0-196.183-76.236-380.506-214.93-519.2Zm-239.112 239.745c95.663 97.018 148.294 224.644 148.294 359.272s-52.631 262.254-148.294 359.272l-80.529-79.286c74.769-75.785 115.88-175.175 115.88-279.986 0-104.811-41.111-204.201-115.88-279.986Zm-981.092 76.914H169.415c-31.06 0-56.472 25.3-56.472 56.471v451.773c0 31.172 25.412 56.472 56.472 56.472h282.358V677.716Z" fill-rule="evenodd"/>
                                    </svg>
                                    <p className="text-sm">Audio format</p>
                                </div>
                                <div className="flex flex-row  gap-[5px] items-center justify-start w-full py-[0.7vh] px-[0.5vh] rounded-md hover:bg-gray-100 hover:cursor-pointer" onClick={handleDownload}>
                                    <svg width="22px" height="22px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="rgb(161 161 170/1)" strokeWidth="2"><polyline points="44 8 44 16 52 16"/><polygon points="52 16 44 8 12 8 12 56 52 56 52 16"/><line x1="20" y1="20" x2="28" y2="20"/><line x1="20" y1="28" x2="44" y2="28"/><line x1="36" y1="36" x2="20" y2="36"/><line x1="20" y1="44" x2="44" y2="44"/></svg>
                                    <p className="text-sm">Text format</p>
                                </div>
                                <div className="flex gap-[5px]  items-center justify-start w-full py-[0.7vh] px-[0.7vh] rounded-md hover:bg-gray-100 hover:cursor-pointer" onClick={handlePdfDownload(userPrompt)}>
                                    <svg width="18px" height="18px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 6.5V6H2V6.5H2.5ZM6.5 6.5V6H6V6.5H6.5ZM6.5 10.5H6V11H6.5V10.5ZM13.5 3.5H14V3.29289L13.8536 3.14645L13.5 3.5ZM10.5 0.5L10.8536 0.146447L10.7071 0H10.5V0.5ZM2.5 7H3.5V6H2.5V7ZM3 11V8.5H2V11H3ZM3 8.5V6.5H2V8.5H3ZM3.5 8H2.5V9H3.5V8ZM4 7.5C4 7.77614 3.77614 8 3.5 8V9C4.32843 9 5 8.32843 5 7.5H4ZM3.5 7C3.77614 7 4 7.22386 4 7.5H5C5 6.67157 4.32843 6 3.5 6V7ZM6 6.5V10.5H7V6.5H6ZM6.5 11H7.5V10H6.5V11ZM9 9.5V7.5H8V9.5H9ZM7.5 6H6.5V7H7.5V6ZM9 7.5C9 6.67157 8.32843 6 7.5 6V7C7.77614 7 8 7.22386 8 7.5H9ZM7.5 11C8.32843 11 9 10.3284 9 9.5H8C8 9.77614 7.77614 10 7.5 10V11ZM10 6V11H11V6H10ZM10.5 7H13V6H10.5V7ZM10.5 9H12V8H10.5V9ZM2 5V1.5H1V5H2ZM13 3.5V5H14V3.5H13ZM2.5 1H10.5V0H2.5V1ZM10.1464 0.853553L13.1464 3.85355L13.8536 3.14645L10.8536 0.146447L10.1464 0.853553ZM2 1.5C2 1.22386 2.22386 1 2.5 1V0C1.67157 0 1 0.671573 1 1.5H2ZM1 12V13.5H2V12H1ZM2.5 15H12.5V14H2.5V15ZM14 13.5V12H13V13.5H14ZM12.5 15C13.3284 15 14 14.3284 14 13.5H13C13 13.7761 12.7761 14 12.5 14V15ZM1 13.5C1 14.3284 1.67157 15 2.5 15V14C2.22386 14 2 13.7761 2 13.5H1Z" fill="rgb(161 161 170/1)"/>
                                    </svg>
                                    <p className="text-sm">PDF format</p>
                                </div>
                                <div className="flex flex-row gap-[6px] items-center justify-start w-full py-[0.7vh] px-[0.5vh] rounded-md hover:bg-gray-100 hover:cursor-pointer" onClick={handleWordDownload(userPrompt)}>
                                    <svg fill="rgb(161 161 170/1)" width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke="1" d="M29.121 8.502v-3.749h-18.745v3.749zM29.121 15.063v-4.686h-13.121v4.686zM29.121 21.623v-4.686h-13.121v4.686zM29.121 27.247v-3.749h-18.745v3.749zM8.546 15.004l1.802 5.917h2.049l1.962-9.842h-2.063l-1.171 5.815-1.656-5.623h-1.742l-1.757 5.652-1.172-5.842h-2.154l1.962 9.84h2.051zM29.751 2.879c0.686 0.003 1.242 0.558 1.245 1.244v23.753c-0.003 0.686-0.558 1.242-1.244 1.245h-20.005c-0.686-0.003-1.242-0.558-1.245-1.244v-4.379h-6.253c-0.005 0-0.011 0-0.016 0-0.338 0-0.644-0.14-0.862-0.366l-0-0c-0.226-0.218-0.366-0.524-0.366-0.862 0-0.006 0-0.011 0-0.017v0.001-12.506c-0-0.005-0-0.011-0-0.016 0-0.338 0.14-0.644 0.366-0.862l0-0c0.218-0.226 0.524-0.366 0.862-0.366 0.006 0 0.011 0 0.017 0h6.252v-4.379c0.003-0.686 0.559-1.242 1.244-1.245h0z"></path>
                                    </svg>
                                    <p className="text-sm">Word format</p>
                                </div>
                                <div className="flex items-center justify-start w-full py-[1vh] px-[1vh] rounded-md hover:bg-gray-100 hover:cursor-pointer">
                                    <p className="text-sm">Power-Point format</p>
                                </div>
                                {premium?(<>
                                <div className="flex flex-row  gap-[4px] items-center justify-start w-full py-[0.7vh] px-[0.5vh] rounded-md hover:bg-gray-100 hover:cursor-pointer">
                                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z" stroke="rgb(161 161 170/1)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p className="text-sm">Image format</p>
                                </div>
                                
                              
                            
                                </>):(<></>)}
                        </div>
                        ):(<></>)}
                    </div>
                </div>
                
            </div>
        </div>
    )
}
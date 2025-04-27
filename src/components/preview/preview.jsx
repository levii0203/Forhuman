import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setPreviewIs } from "../../store/slice/preview";
import Editor from '@monaco-editor/react';


export default function Preview(){
    const [preview,setPreview]  = useState("preview");
    const code = useSelector((state)=>state.preview.code)
    const dispatch = useDispatch()
    return (
        <div className="h-full w-[600px] absolute z-[2000] right-0 flex-col flex bg-gray-100">
            <div className="h-6 flex justify-between left-0 sticky items-center top-4  w-full px-8">
                <div className="flex h-fit rounded-lg p-1 bg-zinc-200">
                    <div  className={`flex px-3 py-2 items-center justify-center rounded-lg cursor-pointer ${preview==="code" ? 'bg-white text-black':'text-zinc-600'}`} onClick={()=>setPreview("code")}>
                        <p className="font-medium text-sm">Code</p>
                    </div>
                    <div className={`flex px-3 py-2 items-center justify-center rounded-lg cursor-pointer ${preview==="preview" ? 'bg-white text-black':'text-zinc-600'}`} onClick={()=>setPreview("preview")}>
                        <p className="font-medium text-sm">Preview</p>
                    </div>
                </div>
                <div className="h-10 w-10 flex hover:bg-gray-200 rounded-full items-center justify-center  cursor-pointer" onClick={()=>dispatch(setPreviewIs(false))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="24px" height="24px" viewBox="0 0 32 32">
                        <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                    </svg>
                </div>
            </div>
            <div className="flex left-0 mt-8 bg-white h-full w-full">
                {preview==="code" ? (
                    <>
                        <Editor
                            height="full"
                            language="html"
                            value={code}
                            options={{ readOnly: true, minimap: { enabled: false }, scrollBeyondLastLine: false }}
                            theme={'vs-dark'}
                            className='overflow-hidden flex h-full'
                        />

                    </>
                ):(
                    <>
                       <iframe
                        srcDoc={code} 
                        className="h-full w-full flex"
                        title="HTML Preview"
                        sandbox="allow-same-origin allow-scripts" 
                    
                        />
                    </>
                )}
            </div>
        </div>
    )
}
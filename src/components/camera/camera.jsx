"use client"
import Webcam from "react-webcam";
import { useEffect , useRef , useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { setImage, setOn, setTake } from "../../store/slice/camera";
import { addToImages } from "../../store/slice/images";


export default function Camera(){
    const videoRef = useRef(null);
    const image = useSelector((state)=>state.camera.image);
    const take = useSelector((state)=>state.camera.take);
    const load = useRef(false);
    const [stream, setStream] = useState(null);
    const dispatch= useDispatch();

    /*useEffect(()=>{
        async function startCamera() {
            try {
              const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
              });
              setStream(mediaStream);
              if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
              }
            } catch (err) {
              console.error('Error accessing camera:', err);
            }
          }
          if(!load.current){
            startCamera();
            load.current = true;
          }
    },[])*/
     function CapturePhoto(){
        const screenshot = videoRef.current.getScreenshot();
        dispatch(setImage(screenshot));
        dispatch(setTake(true));
        /*const interval = setInterval(()=>{
            const a = document.createElement('a');
            a.href=screenshot
            a.download = "ss.jpeg"
            a.click();
            clearInterval(interval)
        },1000)*/
     }

     function keepTaking(){
        dispatch(setTake(false));
        dispatch(addToImages(image));
     }

     function doneHandler(){
        dispatch(setTake(false));
        dispatch(setOn(false));
        dispatch(addToImages(image));
     }
     return (
        <div className="flex absolute h-screen z-[1000] w-screen items-center justify-center">
            <div className="relative h-fit w-fit flex items-center justify-center">
                {/*<video
                ref={videoRef}
                className="max-w-[600px] w-full max-h-[900px]  md:mx-h-[600px] h-full flex "
                autoPlay
                />*/}
                {take  ? (
                    <>
                    <img src={image} className="max-w-[600px] w-full max-h-[900px] md:mx-h-[600px] h-full flex "></img>
                    <div className="absolute flex gap-4 bottom-0 right-0 mb-4 mr-4">
                        <button className="flex text-white hover:ring-2 hover:ring-zinc-400 rounded-xl py-[6px] px-4 bg-zinc-500 hover:bg-zinc-600" onClick={()=>{dispatch(setImage(null)); dispatch(setTake(null))}}>Discard</button>
                        <button className="flex text-white hover:ring-2 hover:ring-blue-400 rounded-xl py-[6px] px-4 bg-blue-500 hover:bg-blue-600" onClick={keepTaking}>Keep taking</button>
                        <button className="flex text-white hover:ring-2 hover:ring-blue-400 rounded-xl py-[6px] px-4 bg-blue-500 hover:bg-blue-600" onClick={doneHandler} >Done</button>
                    </div>
                    </>
                ):(
                    <>
                  <Webcam
                    audio={false}
                    ref={videoRef}
                    screenshotFormat="image/jpeg"
                    className="max-w-[600px] w-full max-h-[900px] md:mx-h-[600px] h-full flex "
                    videoConstraints={{
                    facingMode: "user",
                    
                    }}
                    screenshotQuality={1} 
                    style={{ filter: "brightness(120%)" }}
                 />
                 <button className="py-[6px] absolute flex bottom-0 right-0 mb-4 mr-4 hover:ring-2 hover:ring-blue-400 rounded-xl px-4 text-white bg-blue-500 hover:bg-blue-600 " onClick={CapturePhoto}>Take Photo</button>
                 </>
                )}
                
            </div>
        </div>
     )
}
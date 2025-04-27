
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Page from './chat.forhuman/page';
import NavB from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import SidebarMobile from './components/sidebar/mobile';
import Camera from './components/camera/camera';
import WhatsNext from './components/next/whatsNext';
import Preview from './components/preview/preview';


function App() {
  const sidebar = useSelector((state)=>state.sidebar.is);
  const camOn = useSelector((state)=>state.camera.on);
  const dark = useSelector((state)=>state.dark.isDark);
  const next = useSelector((state)=>state.chat.next);
  const previewOn = useSelector((state)=>state.preview.previewIs)

  return (
    <div className={`flex flex-row m-0 w-screen h-screen border-black  ${dark ? 'bg-[#1d1e20]':'bg-white'}`}>
      { next ? (
        <WhatsNext/>
       ):(
        <>
        {sidebar ? (
          <>
            <Sidebar/>
            <div className='w-screen sm:hidden absolute h-screen flex-row flex z-50'>
                <SidebarMobile/>
                <div className='flex w-[calc(30%)] h-screen opacity-25 z-50 bg-[#00000081]'></div>
            </div>
          </>
        ) : (<></>)}
        {camOn ? (
          <>
            <Camera/>
          </>
        ):(<></>)}
        <div className='flex flex-col relative m-0 w-full min-w-[320px] h-screen'>
          <NavB/>
          <Page/>
        </div>
        </>
      )}
      {previewOn ? (
        <Preview/>
      ):(
        <></>
      )}
    </div>
  );
}

export default App;

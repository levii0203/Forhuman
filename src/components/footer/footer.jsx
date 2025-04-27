import { useSelector } from "react-redux"


export default  function Footer(){
    const premium = useSelector((state)=>state.user.is_premium)
    return (
        <div className="flex m-0 h-fit py-2 w-full items-center bg-white justify-center">
            <p className="hidden md:flex font-[300] text-[15px]">Forhuman generates answers with AI, so use it</p>
            <p className="flex md:hidden font-[300] text-sm text-blue-600">{ premium?( "Version | Premium" ):("Version | Free")}</p>
        </div>
    )
}
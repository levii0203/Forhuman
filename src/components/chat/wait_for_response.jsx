


export default function Wait({message}){
    return (
        <div className="flex h-fit pt-[2vh] w-full py-4 px-4 justify-center items-start  flex-col">
            <p className="flex animate-flash flex-wrap xl:text-lg lg:text-normal font-light text-gray-600 ">{message}</p>
        </div>
    )
}
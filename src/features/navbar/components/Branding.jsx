import { PiSnowflakeFill } from "react-icons/pi";

export const Branding = () => {

    let logoStyle = {color: "blue", fontSize: "40px"};

    return (
        <div className="flex items-center gap-x-2 w-[30vw] h-max-full md:w-full md:mb-2 ml-2 md:ml-0 md:pb-3 md:border-b border-b-stone-400 
            text-3xl font-bold text-indigo-600 text-shadow-2xs">
            <img src="northfrost-logo.jpg" alt="logo" />
        </div>
    )
}

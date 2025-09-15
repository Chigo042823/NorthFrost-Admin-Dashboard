import { PiSnowflakeFill } from "react-icons/pi";

export const Branding = () => {

    let logoStyle = {color: "blue", fontSize: "40px"};

    return (
        <div className="flex items-center gap-x-2 w-full mb-2 pb-3  border-b border-b-stone-400 
            text-3xl font-bold text-indigo-600 text-shadow-2xs">
            {/* North<PiSnowflakeFill className="p-0 m-0"/>Frost */}
            <img src="/src/assets/northfrost-logo.jpg" alt="logo" />
        </div>
    )
}

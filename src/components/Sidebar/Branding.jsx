import { GiIceCube } from "react-icons/gi"

export const Branding = () => {

    let logoStyle = {color: "blue", fontSize: "40px"};

    return (
        <div className="flex items-center gap-x-2 w-full p-2 pb-3 mb-3 border-b border-b-stone-400 
            text-xl font-bold text-indigo-700">
            <GiIceCube style={logoStyle}/>
            KoolKyubs
        </div>
    )
}

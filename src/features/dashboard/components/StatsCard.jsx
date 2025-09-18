import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io"

const colors = {
  indigo: [
    "bg-indigo-100",
    "text-indigo-600"
  ],
  red: [
    "bg-rose-100",
    "text-red-600"
  ],
  orange: [
    "bg-amber-100",
    "text-amber-600"
  ],
  green: [
    "bg-emerald-100",
    "text-emerald-600"
  ]
}

export const StatsCard = ({title, value, lastValue, Icon, color, isCurrency, href}) => {
    let percentage = ((value-lastValue)/value) * 100;
    return (
        <a href={href} className="rounded-lg bg-white border border-stone-300 p-3 shadow space-y-1 
          hover:bg-gray-100 hover:scale-105 hover:z-10 transition-all duration-300 ease-in-out">
            <div className="flex items-center">
              <p className="text-stone-500 text-sm">{title}</p>
              <div className={`mr-0 ml-auto flex items-center py-1 px-2 rounded-lg text-xs gap-x-1
                ${percentage > 0 ? "bg-emerald-100 text-emerald-800" : percentage == 0 ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-800"}`}>
                {percentage > 0 ? <IoIosTrendingUp className="text-emerald-800" /> : percentage == 0 ?
                    "-- " : <IoIosTrendingDown className="text-red-800" />}
                {Math.abs(percentage).toFixed(2)}%
              </div>
            </div>
            <div className="flex items-center mx-1 mt-3 mb-2 gap-x-3">
              <div className={`p-2.5 rounded-full ${colors[color][0]}`}>
                <Icon className={`text-3xl ${colors[color][1]}`}/>
              </div>
              <div className="text-3xl font-semibold flex items-center">
                <p>
                  {isCurrency ? "₱" + value.toFixed(2) : value}
                </p>
              </div>
            </div>
        </a>
    )
}

export const StatsCardSection = ({children}) => {
  return (
    <div className="p-4 grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-3">
      {children}
    </div>
  )
}
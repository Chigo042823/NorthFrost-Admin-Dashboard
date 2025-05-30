import { GiReceiveMoney, GiPayMoney } from "react-icons/gi"
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io"
import { BsBoxSeam } from "react-icons/bs"

export const StatsCard = () => {
  return (
    <div className="p-4 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3">
      <Card title={"Total Earnings"} value={1250} lastValue={568} Icon={GiReceiveMoney} isCurrency={true} href={"Finance"}/>
      <Card title={"Total Spendings"} value={760} lastValue={800} Icon={GiPayMoney} isCurrency={true} href={"Finance"} />
      <Card title={"Orders"} value={10} lastValue={15} Icon={BsBoxSeam} href={"Orders"}/>
    </div>
  )
}

const Card = ({title, value, lastValue, Icon, isCurrency, href}) => {
    let percentage = ((value-lastValue)/value) * 100;
    return (
        <a href={href} className="rounded-lg bg-white border border-stone-300 p-3 shadow space-y-1 
          hover:bg-gray-100 hover:scale-105 hover:z-10 transition-all duration-300 ease-in-out">
            <div className="flex items-center">
              <p className="text-stone-500 text-sm">{title}</p>
              <div className={`mr-0 ml-auto flex items-center py-1 px-2 rounded-lg text-xs gap-x-1
                ${percentage > 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                {percentage > 0 ? <IoIosTrendingUp className="text-emerald-800" /> :
                    <IoIosTrendingDown className="text-red-800" />}
                {Math.abs(percentage).toFixed(2)}%
              </div>
            </div>
            <div className="flex items-center mx-1 mt-3 mb-2 gap-x-3">
              <div className="p-2.5 rounded-full bg-indigo-100">
                <Icon className="text-3xl text-indigo-700"/>
              </div>
              <div className="text-3xl font-semibold flex items-center">
                {/* <TbCurrencyPeso className="text-4xl"/> */}
                <p>
                  {isCurrency ? "₱" + value.toFixed(2) : value}
                </p>
              </div>
            </div>
        </a>
    )
}

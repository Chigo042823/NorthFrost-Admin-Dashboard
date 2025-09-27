import Select from "react-select"
import { monthOptions } from "../utils/month"

export const MonthSelect = ({monthSelected, onChange}) => {
    return (
        <Select
            isSearchable={true}
            value={monthSelected}
            options={monthOptions}
            onChange={e => onChange(e)}
            className="ml-4 w-[10vw] min-w-34 rounded-md text-stone-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
    )
}
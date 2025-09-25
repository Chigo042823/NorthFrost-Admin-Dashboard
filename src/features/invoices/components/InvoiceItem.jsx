import { fmtPhp } from "@/shared/utils/currency";
import { FaRegTrashAlt } from "react-icons/fa";

export const InvoiceItem = ({ item, onRemove, onChange }) => {
  return (
    <div className="w-full grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-2 border-b border-neutral-300 py-1 
      text-sm font-semibold text-stone-600">
      <input
        type="text"
        value="Purified Ice Cubes"
        className="min-w-0 rounded-md px-2 py-1 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        onChange={(e) => onChange(item.order_id, { name: e.target.value })}
      />
      <input
        type="number"
        className="min-w-0 rounded-md px-2 py-1 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        value={item.quantity || 0}
        onChange={(e) =>
          onChange(item.order_id, { quantity: parseInt(e.target.value) || 0 })
        }
      />
      <input
        type="text"
        value={item.unit || "kg"}
        className="min-w-0 rounded-md px-2 py-1 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        onChange={(e) => onChange(item.order_id, { unit: e.target.value })}

      />
      <input
        type="number"
        className="min-w-0 rounded-md px-2 py-1 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        value={item.price || 10}
        onChange={(e) =>
          onChange(item.order_id, { price: e.target.value || 0 })
        }
      />
      <input
        type="number"
        className="min-w-0 rounded-md px-2 py-1 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        value={item.total_amount || 0}
        onChange={(e) =>
          onChange(item.order_id, { total_amount: parseFloat(e.target.value) || 0 })
        }
      />
      <button
        type="button"
        onClick={() => onRemove(item.order_id)}
        className="rounded-full "
      >
        <FaRegTrashAlt size={"1.1em"} className="hover:text-stone-500"/>
      </button>
    </div>
  );
};

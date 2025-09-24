import { FaRegTrashAlt } from "react-icons/fa";

export const InvoiceItem = ({ item, onRemove, onChange }) => {
  return (
    <div className="w-full grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-2 border-b border-neutral-300 py-1">
      <input
        type="text"
        defaultValue="Purified Ice Cubes"
        className="min-w-0 rounded-md px-2 py-1 text-stone-700 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        onChange={(e) => onChange(item.order_id, { name: e.target.value })}
      />
      <input
        type="number"
        defaultValue={item.quantity ? item.quantity : 0}
        className="min-w-0 rounded-md px-2 py-1 text-stone-700 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        onChange={(e) =>
          onChange(item.order_id, { quantity: parseInt(e.target.value) || 0 })
        }
      />
      <input
        type="text"
        defaultValue={item.unit ? item.unit : "kg"}
        className="min-w-0 rounded-md px-2 py-1 text-stone-700 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        onChange={(e) => onChange(item.order_id, { unit: e.target.value })}

      />
      <input
        type="number"
        defaultValue="0"
        className="min-w-0 rounded-md px-2 py-1 text-stone-700 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        onChange={(e) =>
          onChange(item.order_id, { price: parseFloat(e.target.value) || 0 })
        }
      />
      <input
        type="number"
        defaultValue={item.total_amount ? item.total_amount : 0}
        className="min-w-0 rounded-md px-2 py-1 text-stone-700 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        onChange={(e) =>
          onChange(item.order_id, { total_amount: parseFloat(e.target.value) || 0 })
        }
      />
      <button
        type="button"
        onClick={() => onRemove(item.order_id)}
        className="rounded-full "
      >
        <FaRegTrashAlt size={"1.1em"} className="text-stone-700 hover:text-stone-500"/>
      </button>
    </div>
  );
};

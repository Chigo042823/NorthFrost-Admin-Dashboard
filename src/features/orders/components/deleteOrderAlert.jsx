import { Alert } from '@/shared/components/alert';
import { useAlert } from '@/shared/contexts/alertContext';

export default function DeleteOrderAlert({
  onClick
}) {

  const { setIsVisible } = useAlert();
  
  return (
    <Alert name={"orderForm"} title={"Edit Order"}>
      <div className="flex justify-end gap-3 mt-4 absolute bottom-4 right-4">
          <button
              onClick={() => 
                {
                  setIsVisible(false);
                }
              }
              className="px-4 py-2 rounded-md border text-stone-600 hover:bg-stone-100"
          >
              Cancel
          </button>
          <button
              type="submit"
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              // disabled={saveOrderMutation.isPending}
              onClick={() => {
                  onClick()
              }}
          >
              Delete Order
          </button>
        </div>
    </Alert> 
  )
}

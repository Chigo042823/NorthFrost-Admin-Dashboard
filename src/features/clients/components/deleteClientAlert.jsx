import { Alert } from '@/shared/components/alert';
import { useAlert } from '@/shared/contexts/alertContext';
import { useDeleteClient } from '../api/clientQueries';

export default function DeleteClientAlert({
  onClick
}) {

  const { setIsVisible } = useAlert();
  
  return (
    <Alert name={"clientForm"} title={"Edit Client"}>
      <div className="flex justify-end gap-3 mt-4 absolute bottom-4 right-4">
          <button
              onClick={() => setIsVisible(false)}
              className="px-4 py-2 rounded-md border text-stone-600 hover:bg-stone-100"
          >
              Cancel
          </button>
          <button
              type="submit"
              className="px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
              // disabled={saveClientMutation.isPending}
              onClick={() => {
                  onClick()
                  // setIsVisible(false);
              }}
          >
              Delete Client
          </button>
        </div>
    </Alert> 
  )
}

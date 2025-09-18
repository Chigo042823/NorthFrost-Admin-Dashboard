import React from 'react'
import { useModal } from '../contexts/modalContext';

export const ConfirmModalButtons = () => {
    const { setCurrentModal, onClick } = useModal();

    return (
        <div className="flex justify-end gap-3 mt-4 absolute bottom-4 right-4">
            <button
                onClick={() => 
                {
                    setCurrentModal(null)
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
                onClick={() => 
                    {
                        onClick();
                    }
                }
            >
                Confirm
            </button>
        </div>
    )
}

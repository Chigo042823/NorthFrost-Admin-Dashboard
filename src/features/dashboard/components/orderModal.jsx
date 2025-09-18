import { OrderForm } from '@/features/orders/components/orderForm'
import { Modal } from '@/shared/components/modal';

export default function OrderModal({
  formData,
  onSuccess
}) {
  
  return (
    <Modal name={"orderForm"} title={"Edit Order"}>
      <OrderForm data={formData} onSuccess={onSuccess}/>
    </Modal> 
  )
}

import { OrderForm } from '@/features/orders/components/orderForm'
import { MediumModal } from '@/shared/components/modal';

export default function OrderModal({
  formData
}) {
  
  return (
    <MediumModal name={"orderForm"} title={"Edit Order"}>
      <OrderForm data={formData} />
    </MediumModal> 
  )
}

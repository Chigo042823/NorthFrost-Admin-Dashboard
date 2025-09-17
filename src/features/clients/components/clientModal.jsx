import { ClientForm } from '@/features/clients/components/clientForm'
import { Modal } from '@/shared/components/modal';

export default function ClientModal({
  formData,
  onSuccess
}) {
  
  return (
    <Modal name={"clientForm"} title={"Edit Client"}>
      <ClientForm data={formData} onSuccess={onSuccess}/>
    </Modal> 
  )
}

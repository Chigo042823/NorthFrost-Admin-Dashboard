import { ClientForm } from '@/features/clients/components/clientForm'
import { MediumModal } from '@/shared/components/modal';

export default function ClientModal({
  formData
}) {
  
  return (
    <MediumModal name={"clientForm"} title={"Edit Client"}>
      <ClientForm data={formData}/>
    </MediumModal> 
  )
}

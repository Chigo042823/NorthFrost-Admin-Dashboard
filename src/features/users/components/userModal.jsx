import { UserForm } from '@/features/users/components/userForm'
import { MediumModal } from '@/shared/components/modal';

export default function UserModal({
  formData
}) {
  
  return (
    <MediumModal name={"userForm"} title={"Edit User"}>
      <UserForm data={formData}/>
    </MediumModal> 
  )
}

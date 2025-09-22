import { MainContainer } from "@/shared/components/mainContainer"
import { UsersTable } from "@/features/users/components/usersTable"

export const Users = () => {
    return (
        <MainContainer title={"Users"}>
            <UsersTable />
        </MainContainer>
    )
}
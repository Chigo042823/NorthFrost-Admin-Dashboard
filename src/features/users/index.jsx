import { MainContainer } from "@/shared/components/mainContainer"
import { UsersTable } from "@/features/users/components/UsersTable"

export const Users = () => {
    return (
        <MainContainer title={"Users"}>
            <UsersTable />
        </MainContainer>
    )
}
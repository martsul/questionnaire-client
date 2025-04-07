import { Table } from "react-bootstrap";
import { UsersTableHead } from "./users-table-head/users-table-head";
import { TableTitle } from "../table-title/table-title";
import { dictionary } from "../../constants/dictionary";
import { useLanguage } from "../../contexts/language-context/use-language";
import { UsersTableBody } from "./users-table-body/users-table-body";
import { useUsersTable } from "./use-users-table";
import { ManagementPanel } from "../management-panel/management-panel";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UsersTable = () => {
    const { language } = useLanguage();
    const words = dictionary[language].usersTable;
    const {
        users,
        handlerSingleInput,
        selectedUsers,
        handlerMainInput,
        sortUsers,
        filterUsers,
        sendUsers,
    } = useUsersTable();
    const { userData } = useAuthorization();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData || !userData.isAdmin) {
            navigate("/");
        }
    }, [userData, navigate]);

    return (
        <section className="mt-5">
            <ManagementPanel sendUsers={sendUsers} isActive={Boolean(selectedUsers.size)} />
            <TableTitle title={words.title} handlerChange={filterUsers} />
            <div className="overflow-auto">
                <Table className="">
                    <UsersTableHead
                        sortUsers={sortUsers}
                        handlerMainInput={handlerMainInput}
                    />
                    <UsersTableBody
                        users={users}
                        handlerSingleInput={handlerSingleInput}
                        selectedUsers={selectedUsers}
                    />
                </Table>
            </div>
        </section>
    );
};

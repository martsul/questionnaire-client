import { Table } from "react-bootstrap";
import { UsersTableHead } from "./users-table-head/users-table-head";
import { TableTitle } from "../table-title/table-title";
import { dictionary } from "../../constants/dictionary";
import { useLanguage } from "../../contexts/language-context/use-language";
import { UsersTableBody } from "./users-table-body/users-table-body";
import { useUsersTable } from "./use-users-table";
import { ManagementPanel } from "../management-panel/management-panel";
import { UsersPanel } from "../users-panel/users-panel";

export const UsersTable = () => {
    const { language } = useLanguage();
    const words = dictionary[language].usersTable;
    const {
        users,
        handlerSingleInput,
        selectedUsers,
        handlerMainInput,
        onSort,
        findUsers,
        sendUsers,
    } = useUsersTable();

    return (
        <section className="mt-5">
            <ManagementPanel isActive={Boolean(selectedUsers.size)}>
                <UsersPanel sendUsers={sendUsers} />
            </ManagementPanel>
            <TableTitle title={words.title} onChange={findUsers} />
            <div className="overflow-auto">
                <Table className="">
                    <UsersTableHead
                        onSort={onSort}
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

import { Form } from "react-bootstrap";
import { FormHeadTag } from "../form-head-tag/form-head-tag";
import { useLanguage } from "../../../contexts/language-context/use-language";
import { dictionary } from "../../../constants/dictionary";
import { useFormHeadUsers } from "./use-form-head-users";
import { useAppSelector } from "../../../redux/hooks";
import { selectUsers } from "../../../redux/entities/form/form-slice";

export const FromHeadUsers = () => {
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const users = useAppSelector(selectUsers);
    const {
        handlerDeleteUser,
        onChangeUser,
        toggleFilter,
        userFilter,
        handlerEnter,
        availableUsers,
    } = useFormHeadUsers();

    const formatUsers = users?.addUsers ? Object.values(users.addUsers) : [];

    return (
        <>
            <Form.Control
                list="user"
                onKeyDown={handlerEnter}
                onChange={onChangeUser}
                placeholder={words.user}
            />
            <datalist id="user">
                {availableUsers.map((e) => {
                    return <option value={e[userFilter]} key={e.id} />;
                })}
            </datalist>
            <div className="d-flex gap-3 flex-wrap">
                <Form.Check
                    checked={userFilter === "name"}
                    onChange={toggleFilter("name")}
                    type={"radio"}
                    label={`name`}
                    value="name"
                />
                <Form.Check
                    checked={userFilter === "email"}
                    onChange={toggleFilter("email")}
                    type={"radio"}
                    label={`email`}
                    value="email"
                />
            </div>
            <div className="d-flex flex-wrap gap-2">
                {formatUsers.map((u) => (
                    <FormHeadTag
                        text={u[userFilter]}
                        key={u.id}
                        onDelete={() => {
                            handlerDeleteUser(u);
                        }}
                    />
                ))}
            </div>
        </>
    );
};

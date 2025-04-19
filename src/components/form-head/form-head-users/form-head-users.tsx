import { Form } from "react-bootstrap";
import { useFormHeadUsers } from "./use-form-head-users";
import Select from "react-select";
import { useLanguage } from "../../../contexts/language-context/use-language";
import { dictionary } from "../../../constants/dictionary";
import { useSelectStyles } from "../../../hooks/use-select-styles";

export const FromHeadUsers = () => {
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const {customStyles} = useSelectStyles()
    const {
        handlerSetUsers,
        onChangeUser,
        toggleFilter,
        userFilter,
        usersOptions,
        users,
    } = useFormHeadUsers();

    return (
        <>
            <Select
                onChange={(users) => handlerSetUsers(users)}
                options={usersOptions}
                value={users}
                isMulti
                placeholder={words.user}
                styles={customStyles}
                noOptionsMessage={() => words.noResult}
                onInputChange={(value) => onChangeUser(value)}
            />
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
        </>
    );
};

import { ChangeEventHandler, FC, useReducer, useState } from "react";
import { ProviderProps } from "../../types/provider-pops";
import { FormContext } from ".";
import { FormHeadState } from "../../types/form/form-head-state";
import { formHeadReducer } from "../../helpers/form-head-reducer";
import { useAuthorization } from "../authorization-context/use-authorization";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// const DEFAULT_HEAD_VALUES: FormHeadState = {
//     isPublic: true,
//     owner: "No Owner",
//     date: new Date(),
//     title: "",
//     description: "",
//     theme: "education",
//     ownTheme: "",
//     tag: "",
//     tags: new Set(),
//     sortUsers: "email",
//     user: "",
//     users: new Set(),
//     like: false,
//     isNew: true,
// };

export const FormContextProvider: FC<ProviderProps> = ({ children }) => {
    // const [headParams, dispatch] = useReducer(
    //     formHeadReducer,
    //     DEFAULT_HEAD_VALUES
    // );
    // const { userData } = useAuthorization();

    // (() => {
    //     if (userData?.userName) {
    //         dispatch({ type: "INIT", payload: userData?.userName });
    //     }
    // })();

    // const togglePublic = () => {
    //     dispatch({ type: "TOGGLE_PUBLIC" });
    // };
    // const changeTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    //     dispatch({type: "CHANGE_TITLE", payload:event.target.value})
    // }
    // const changeDescription

    const { register, handleSubmit, watch } = useForm();
    const [isEdit, setIsEdit] = useState(false);
    const [isPublic, setIsPublic] = useState(true);

    const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };
    const togglePublic = () => {
        setIsPublic(!isPublic);
    };

    return (
        <FormContext.Provider
            value={{
                onSubmit: handleSubmit(onSubmit),
                register,
                watch,
                toggleEdit,
                togglePublic,
                isEdit,
                isPublic,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

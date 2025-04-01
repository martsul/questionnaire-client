import { ChangeEvent, FormEventHandler, useReducer } from "react";

const DEFAULT_FORM_VALUES = {
    email: "",
    password: "",
    name: "",
};

type FormValues = keyof typeof DEFAULT_FORM_VALUES;

type FormAction = { type: "UPDATE_FIELD"; name: FormValues; value: string };

const reducer = (state: typeof DEFAULT_FORM_VALUES, action: FormAction) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.name]: action.value };
        default:
            return state;
    }
};

export const useAuthorizationForm = () => {
    const [formParameters, dispatch] = useReducer(reducer, DEFAULT_FORM_VALUES);

    const handlerChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name as FormValues;

        dispatch({ type: "UPDATE_FIELD", name, value });
    };

    const handlerSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        console.log(formParameters);
    };

    return { handlerChangeValue, formParameters, handlerSubmit };
};

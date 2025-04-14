import { Form } from "react-bootstrap";
import { FC } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setTheme } from "../../../redux/entities/form/form-slice";

type Props = { themes: string[]; theme: string };

export const FromHeadTheme: FC<Props> = ({ themes, theme }) => {
    const dispatch = useAppDispatch();
    const handlerChange = (value: string) => {
        dispatch(setTheme(value));
    };

    return (
        <Form.Select
            value={theme}
            onChange={(event) => handlerChange(event.target.value)}
            aria-label="themes"
        >
            {themes.map((t) => (
                <option value={t} key={t}>
                    {t}
                </option>
            ))}
        </Form.Select>
    );
};

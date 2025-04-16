import { FC } from "react";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { Form } from "react-bootstrap";
import { useAppDispatch } from "../../redux/hooks";
import { QuestionsType } from "../../types/form/questions-type";
import { changeType } from "../../redux/entities/forms/forms-slice";

type Props = {
    type: string;
    index: number;
};

export const QuestionType: FC<Props> = ({ type, index }) => {
    const dispatch = useAppDispatch();
    const { language } = useLanguage();
    const words = dictionary[language].form;

    const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const type = event.currentTarget.value as QuestionsType;
        dispatch(changeType({ type, index: index }));
    };

    return (
        <Form.Select value={type} onChange={onChange}>
            <option value="line">{words.line}</option>
            <option value="paragraph">{words.paragraph}</option>
            <option value="number">{words.number}</option>
            <option value="checkbox">{words.checkbox}</option>
        </Form.Select>
    );
};

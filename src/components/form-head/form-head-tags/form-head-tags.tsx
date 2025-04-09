import { Form } from "react-bootstrap";
import { FormHeadTag } from "../form-head-tag/form-head-tag";
import { useFormContext } from "../../../contexts/form-context/use-form-context";
import { useLanguage } from "../../../contexts/language-context/use-language";
import { dictionary } from "../../../constants/dictionary";

export const FormHeadTags = () => {
    const { register } = useFormContext();
    const { language } = useLanguage();
    const words = dictionary[language].form;

    return (
        <>
            <Form.Control
                {...register("tag")}
                list="tag"
                placeholder={words.tag}
            />
            <datalist id="tag">
                <option value="Яблоко" />
                <option value="Банан" />
                <option value="Груша" />
                <option value="Апельсин" />
            </datalist>
            <div className="d-flex flex-wrap gap-2">
                <FormHeadTag />
            </div>
        </>
    );
};

import { Form } from "react-bootstrap";
import { FormHeadTag } from "../form-head-tag/form-head-tag";
import { useFormContext } from "../../../contexts/form-context/use-form-context";
import { useLanguage } from "../../../contexts/language-context/use-language";
import { dictionary } from "../../../constants/dictionary";

export const FormHeadTags = () => {
    const { register, onChangeTag, availableTags } = useFormContext();
    const { language } = useLanguage();
    const words = dictionary[language].form;

    return (
        <>
            <Form.Control
                {...register("tag")}
                list="tag"
                placeholder={words.tag}
                onChange={onChangeTag}
            />
            <datalist id="tag">
                {availableTags.map(e => <option value={e} key={e} />)}
            </datalist>
            <div className="d-flex flex-wrap gap-2">
                <FormHeadTag />
            </div>
        </>
    );
};

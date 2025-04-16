import { Form } from "react-bootstrap";
import { FormHeadTag } from "../form-head-tag/form-head-tag";
import { useLanguage } from "../../../contexts/language-context/use-language";
import { dictionary } from "../../../constants/dictionary";
import { useFormHeadTags } from "./use-form-head-tags";
import { useAppSelector } from "../../../redux/hooks";
import { selectTags } from "../../../redux/entities/forms/forms-slice";

export const FormHeadTags = () => {
    const tags = useAppSelector(selectTags);
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const { onChangeTag, availableTags, handlerEnter, handlerDeleteTag } =
        useFormHeadTags();

    return (
        <>
            <Form.Control
                list="tag"
                placeholder={words.tag}
                onChange={onChangeTag}
                onKeyDown={handlerEnter}
                maxLength={25}
            />
            <datalist id="tag">
                {availableTags.map((e) => (
                    <option value={e} key={e} />
                ))}
            </datalist>
            <div className="d-flex flex-wrap gap-2">
                {tags &&
                    tags.map((tag) => (
                        <FormHeadTag
                            onDelete={() => {
                                handlerDeleteTag(tag);
                            }}
                            text={tag}
                            key={tag}
                        />
                    ))}
            </div>
        </>
    );
};

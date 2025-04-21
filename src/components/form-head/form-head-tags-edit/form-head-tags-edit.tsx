import { useFormHeadTagsEdit } from "./use-form-head-tags-edit";
import { useAppSelector } from "../../../redux/hooks";
import { selectTags } from "../../../redux/entities/form/form-slice";
import Select from "react-select";
import { useLanguage } from "../../../contexts/language-context/use-language";
import { dictionary } from "../../../constants/dictionary";
import { useSelectStyles } from "../../../hooks/use-select-styles";

export const FormHeadTagsEdit = () => {
    const tags = useAppSelector(selectTags);
    const { onChangeTag, availableTags, handlerSetTags } = useFormHeadTagsEdit();
    const { language } = useLanguage();
    const words = dictionary[language].form;
    const { customStyles } = useSelectStyles();

    return (
        <Select
            onChange={(tags) => handlerSetTags(tags)}
            value={tags}
            onInputChange={(value) => onChangeTag(value)}
            isMulti
            styles={customStyles}
            placeholder={words.tag}
            noOptionsMessage={() => words.noResult}
            options={availableTags}
        />
    );
};

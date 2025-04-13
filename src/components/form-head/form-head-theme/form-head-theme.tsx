import { Form } from "react-bootstrap";
import { useFormContext } from "../../../contexts/form-context/use-form-context";
import { useLanguage } from "../../../contexts/language-context/use-language";
import { dictionary } from "../../../constants/dictionary";
import { useFormHeadTheme } from "./use-form-head-theme";

export const FromHeadTheme = () => {
    const { register, watch } = useFormContext();
    const { language } = useLanguage();
    const words = dictionary[language].form;

    const { availableThemes, onChangeTag } = useFormHeadTheme();

    return (
        <>
            <div className="d-flex gap-3 flex-wrap">
                <Form.Check
                    {...register("theme")}
                    type={"radio"}
                    label={words.education}
                    value={words.education.toLowerCase()}
                />
                <Form.Check
                    {...register("theme")}
                    type={"radio"}
                    label={words.quiz}
                    value={words.quiz.toLowerCase()}
                />
                <Form.Check
                    {...register("theme")}
                    type={"radio"}
                    label={words.other}
                    value="other"
                />
            </div>
            {watch("theme") === "other" && (
                <>
                    <Form.Control
                        {...register("ownTheme")}
                        list="theme"
                        onChange={onChangeTag}
                        placeholder={words.theme}
                    />
                    <datalist id="theme">
                        {availableThemes.map((e) => (
                            <option value={e} key={e} />
                        ))}
                    </datalist>
                </>
            )}
        </>
    );
};

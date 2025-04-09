import { Form } from "react-bootstrap";
import { FormHeadTag } from "../form-head-tag/form-head-tag";
import { useFormContext } from "../../../contexts/form-context/use-form-context";

export const FromHeadUsers = () => {
    const { register } = useFormContext();

    return (
        <>
            <Form.Control {...register("user")} />
            <div className="d-flex gap-3 flex-wrap">
                <Form.Check
                    {...register("sortUser")}
                    type={"radio"}
                    label={`name`}
                    value="name"
                />
                <Form.Check
                    {...register("sortUser")}
                    type={"radio"}
                    label={`email`}
                    value="email"
                />
            </div>
            <div className="d-flex flex-wrap gap-2">
                <FormHeadTag />
            </div>
        </>
    );
};

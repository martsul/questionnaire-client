import { useFormContext } from "../../../contexts/form-context/use-form-context";

export const FormHeadDetails = () => {
    const { isEdit, toggleEdit, togglePublic, isPublic } = useFormContext();

    return (
        <div className="d-flex justify-content-between text-muted align-items-center">
            <span>Name</span>
            <div className="d-flex align-items-center gap-3">
                {isEdit && (
                    <button
                        type="button"
                        className="fs-4"
                        onClick={togglePublic}
                    >
                        {!isPublic && (
                            <i className="bi bi-eye-slash text-muted"></i>
                        )}
                        {isPublic && <i className="bi bi-eye"></i>}
                    </button>
                )}
                <button onClick={toggleEdit}>
                    <i className="bi bi-pencil fs-6"></i>
                </button>
                <span>date</span>
            </div>
        </div>
    );
};

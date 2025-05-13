import { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useLanguage } from "../../contexts/language-context/use-language";
import { dictionary } from "../../constants/dictionary";
import { useHelpModal } from "./use-help-modal";
import { Priority } from "../../types/priority";

type Props = {
    show: boolean;
    onHidden: () => void;
};

export const HelpModal: FC<Props> = ({ onHidden, show }) => {
    const { language } = useLanguage();
    const { help } = dictionary[language];
    const { changePriority, changeSummary, values, onSubmit } = useHelpModal();

    return (
        <Modal show={show} onHide={onHidden}>
            <form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{help.help}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column gap-3 ">
                    <div className="d-flex flex-column">
                        <Form.Label htmlFor="priority">
                            {help.priority}
                        </Form.Label>
                        <Form.Select
                            value={values.priority}
                            onChange={(event) =>
                                changePriority(event.target.value as Priority)
                            }
                            id="priority"
                        >
                            <option value="low">{help.low}</option>
                            <option value="average">{help.average}</option>
                            <option value="hight">{help.high}</option>
                        </Form.Select>
                    </div>
                    <div className="d-flex flex-column">
                        <Form.Label htmlFor="summary">
                            {help.summary}
                        </Form.Label>
                        <Form.Control
                            value={values.summary}
                            onChange={(event) => {
                                changeSummary(event.target.value);
                            }}
                            id="summary"
                            as="textarea"
                        />
                    </div>
                    <Button type="submit">{help.send}</Button>
                </Modal.Body>
            </form>
        </Modal>
    );
};

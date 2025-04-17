import { FormEventHandler, useMemo, useState } from "react";
import { WS_BASE_URL } from "../../constants/config";
import { Comment } from "../../types/form/comment";
import { useAuthorization } from "../../contexts/authorization-context/use-authorization";

export const useFormComments = (formId: number) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const { userData } = useAuthorization();

    const ws = useMemo(() => {
        return new WebSocket(WS_BASE_URL + formId);
    }, [formId]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const submitData = JSON.stringify({
            formId,
            text: comment,
            userId: userData?.id,
        });
        ws.send(submitData);
        setComment("");
    };

    ws.onopen = () => {
        console.log("Connect WS");
    };

    ws.onmessage = (event) => {
        try {
            const message: Comment[] = JSON.parse(event.data);
            setComments(message);
        } catch (error) {
            console.error("WS Error" + error);
        }
    };

    ws.onclose = () => {
        console.log("Close WS");
    };

    return { comments, comment, setComment, onSubmit };
};

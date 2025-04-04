import { useContext } from "react";
import { MessageContext } from ".";

export const useMessage = () => {
    const result = useContext(MessageContext);
    if (result === null) {
        throw new Error("Message Context Error");
    }
    return result;
};

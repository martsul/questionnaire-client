import { FC, ReactElement, useState } from "react";
import { MessageContext } from ".";
import { AddMessage, MessageContextState } from "../../types/message-context";

type Props = { children: ReactElement };

export const MessageContextProvider: FC<Props> = ({ children }) => {
    const [message, setMessage] = useState<MessageContextState>(null);

    const addMessage: AddMessage = (type, message) => {
        setMessage({ type, message: message });
        setTimeout(() => setMessage(null), 2000);
    };

    return (
        <MessageContext.Provider value={{ message, addMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

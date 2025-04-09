import { FC, useRef, useState } from "react";
import { MessageContext } from ".";
import { AddMessage, MessageContextState } from "../../types/message-context";
import { ProviderProps } from "../../types/provider-pops";

export const MessageContextProvider: FC<ProviderProps> = ({ children }) => {
    const [message, setMessage] = useState<MessageContextState>(null);
    const timerId = useRef<number>(null);

    const addMessage: AddMessage = (type, message) => {
        if (timerId.current) {
            clearTimeout(timerId.current)
        };
        setMessage({ type, message: message });
        timerId.current = setTimeout(() => setMessage(null), 2000);
    };

    return (
        <MessageContext.Provider value={{ message, addMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

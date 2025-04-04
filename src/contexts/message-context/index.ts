import { createContext } from "react";
import { MessageContextValue } from "../../types/message-context";

export const MessageContext = createContext<MessageContextValue | null>(null);

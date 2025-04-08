type MessageType = "danger" | "success";

export type MessageContextState = {
    type: MessageType;
    message: string;
} | null;

export type AddMessage = (type: MessageType, message: string) => void;

export type MessageContextValue = {
    message: MessageContextState;
    addMessage: AddMessage;
};

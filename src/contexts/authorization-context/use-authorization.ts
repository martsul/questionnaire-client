import { useContext } from "react";
import { AuthorizationContext } from ".";

export const useAuthorization = () => {
    const result = useContext(AuthorizationContext);
    if (result === null) {
        throw new Error("Language Context Error");
    }
    return result;
};

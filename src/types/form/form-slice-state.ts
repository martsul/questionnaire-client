import { FormEntities } from "./form-entities";

export type FormSliceState = {
    formData: FormEntities | null;
    requestStatus: "idle" | "pending" | "rejected" | "fulfilled";
};

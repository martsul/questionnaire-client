import { SfUser } from "./sf-user";

export type SfAuthResponse = {
    isRegistered: boolean;
    data: SfUser;
};

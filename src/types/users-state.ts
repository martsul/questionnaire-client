import { AvailableUser } from "./form/available-users";

export type UsersState = {
    addUsers: Record<number, AvailableUser>;
    deleteUsers: Record<number, AvailableUser>;
};

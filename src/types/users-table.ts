export type UsersTable = {
    users: { id: number; name: string; isAdmin: boolean; isBlocked: boolean }[];
    status: {
        isAdmin: boolean;
        isBlocked: boolean;
    };
};

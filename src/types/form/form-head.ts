export type FormHead = {
    id: number;
    ownerId: number;
    title: string;
    description: string;
    likes: number;
    img: string;
    tags: string[];
    users: string[];
    createdAt: Date;
    User: { name: string };
    Theme: { theme: string };
};

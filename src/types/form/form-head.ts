export type FormHead = {
    id: number;
    ownerId: number;
    title: string;
    description: string;
    likes: number;
    img: string;
    createdAt: Date;
    isPublic: boolean;
    owner: { name: string };
    theme: string;
    themes: string[];
};

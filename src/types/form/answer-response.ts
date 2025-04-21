export type AnswerResponse = {
    answer: string;
    createdAt: string;
    User: {
        name: string;
    };
    Question: {
        id: string;
        title: string;
        description: string;
    };
};

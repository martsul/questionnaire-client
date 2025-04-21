import { createSelector } from "@reduxjs/toolkit";
import { selectHead, selectQuestions, selectTags, selectUsers } from "./form-slice";

export const selectEditData = createSelector(
    [selectHead, selectUsers, selectTags, selectQuestions],
    (head, users, tags, questions) => {
        if (head) {
            return {
                formId: head.id,
                title: head.title,
                theme: head.theme,
                description: head.description,
                isPublic: head.isPublic,
                users: users.map((user) => user.id),
                tags: tags.map((t) => t.value),
                questions,
                img: head.img,
            };
        }
        return undefined;
    }
);

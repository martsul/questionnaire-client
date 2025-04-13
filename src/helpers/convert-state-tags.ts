import { TagsState } from "../types/form/tags-state";

export const convertStateTags = (tags: TagsState) => {
    return {
        addTags: Array.from(tags.addTags),
        deleteTags: Array.from(tags.deleteTags),
    };
};

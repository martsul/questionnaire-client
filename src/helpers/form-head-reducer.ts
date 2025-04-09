import { produce } from "immer";
import { FormAction } from "../types/form/form-action";
import { FormHeadState } from "../types/form/form-head-state";
import { StaticFormTheme } from "../types/form/static-form-theme";

export const formHeadReducer = (
    state: FormHeadState,
    action: FormAction
): FormHeadState =>
    produce(state, (draft) => {
        switch (action.type) {
            case "INIT": {
                if (draft.isNew) {
                    draft.owner = action.payload;
                    draft.isNew = false;
                }
                break;
            }
            case "TOGGLE_LIKE": {
                draft.like = !draft.like;
                break;
            }
            case "TOGGLE_PUBLIC": {
                draft.isPublic = !draft.isPublic;
                break;
            }
            case "CHANGE_DESCRIPTION": {
                draft.description = action.payload;
                break;
            }
            case "CHANGE_TITLE": {
                draft.title = action.payload;
                break;
            }
            case "TOGGLE_THEME": {
                draft.theme = action.payload as StaticFormTheme;
                break;
            }
            case "CHANGE_OWN_THEME": {
                draft.ownTheme = action.payload;
                break;
            }
            case "TOGGLE_SORT_USERS": {
                draft.sortUsers = action.type as "email" | "name";
                break;
            }
            case "CHANGE_USER": {
                draft.user = action.payload;
                break;
            }
            case "ADD_USER": {
                draft.users.add(action.payload);
                break;
            }
            case "REMOVE_USER": {
                draft.users.delete(action.payload);
                break;
            }
            case "ADD_TAG": {
                draft.tags.add(action.payload);
                break;
            }
            case "REMOVE_TAG": {
                draft.tags.delete(action.payload);
                break;
            }
            case "CHANGE_TAG": {
                draft.tag = action.payload;
                break;
            }
            default:
                break;
        }
    });

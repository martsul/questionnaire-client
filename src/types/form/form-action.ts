export type FormAction =
    | { type: "INIT"; payload: string }
    | { type: "TOGGLE_PUBLIC" }
    | { type: "TOGGLE_LIKE" }
    | { type: "CHANGE_TITLE"; payload: string }
    | { type: "CHANGE_DESCRIPTION"; payload: string }
    | { type: "TOGGLE_THEME"; payload: string }
    | { type: "CHANGE_OWN_THEME"; payload: string }
    | { type: "TOGGLE_SORT_USERS"; payload: string }
    | { type: "CHANGE_USER"; payload: string }
    | { type: "ADD_USER"; payload: string }
    | { type: "REMOVE_USER"; payload: string }
    | { type: "CHANGE_TAG"; payload: string }
    | { type: "ADD_TAG"; payload: string }
    | { type: "REMOVE_TAG"; payload: string }

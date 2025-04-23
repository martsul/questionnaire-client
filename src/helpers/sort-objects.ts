export const sortObjects = (
    object: Record<string, string | number | boolean | object>[],
    key: string,
    isAscending: boolean
) => {
    return object.sort((a, b) => {
        if (typeof a[key] === "string" && typeof b[key] === "string") {
            return isAscending
                ? a[key].localeCompare(b[key])
                : b[key].localeCompare(a[key]);
        }
        return isAscending ? +(a[key] > b[key]) : +(a[key] < b[key]);
    });
};

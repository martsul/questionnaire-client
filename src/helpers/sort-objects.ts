export const sortObjects = (
    object: Record<string, unknown>[],
    key: string,
    isAscending: boolean
) => {
    return object.sort((a, b) => {
        if (typeof a[key] === "string" && typeof b[key] === "string") {
            return isAscending
                ? a[key].localeCompare(b[key])
                : b[key].localeCompare(a[key]);
        }
        if (
            (typeof a[key] === "number" || typeof a[key] === "boolean") &&
            (typeof b[key] === "number" || typeof b[key] === "boolean")
        ) {
            const numA = typeof a[key] === "boolean" ? +a[key] : a[key];
            const numB = typeof b[key] === "boolean" ? +b[key] : b[key];
            return isAscending ? numA - numB : numB - numA;
        }
        return 0;
    });
};

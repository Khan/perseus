// Performs a deep copy of the given object. If there are cycles in the object
// tree, an error is thrown.
export const clone = <T>(obj: T): T => {
    const json = JSON.stringify(obj);
    if (!json) {
        throw new Error("Oops, couldn't clone given object!");
    }
    return JSON.parse(json);
};

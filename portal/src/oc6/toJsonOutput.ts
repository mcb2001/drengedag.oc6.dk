export function objectToJsonOutput<T>(obj: T) {
    return JSON.stringify(obj, null, 4);
}

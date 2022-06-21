import { objectToJsonOutput } from "./";

export function errorToJsonOutput(err: any) {
    const dictionary: Array<{ key: string, value: string }> = [];

    Object.getOwnPropertyNames(err)
        .map((key: string, index: number) => {
            const value = err[key];
            dictionary.push({
                key,
                value
            });
        });

    return objectToJsonOutput(dictionary);
}
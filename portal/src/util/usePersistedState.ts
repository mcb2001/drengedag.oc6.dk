import React from "react";

function usePersistedState<T>(
    initital: T,
    persistanceKey: string,
    init: boolean = false,
    validate: (t: T) => boolean = t => true): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = React.useState<T>(initital);
    const [isInitialized, setIsInitialized] = React.useState<boolean>(false);

    const setPersistedState: React.Dispatch<React.SetStateAction<T>> = (value: React.SetStateAction<T>) => {
        setState(value);
        window.localStorage.setItem(persistanceKey, JSON.stringify(value));
    };

    React.useEffect(() => {
        if (init && !isInitialized) {
            const newStateString = window.localStorage.getItem(persistanceKey);

            if (newStateString) {
                const newState = JSON.parse(newStateString);

                if (newState) {
                    if (validate(newState)) {
                        setIsInitialized(!isInitialized);
                        setState(newState);
                    }
                }
            }
        }
    }, [state, isInitialized]);

    return [state, setPersistedState];
}

function validateArray<T>(...knownKeys: Array<string>): (arr: Array<T>) => boolean {
    return (arr: Array<T>) =>
        Array.isArray(arr)
        && arr.reduce<boolean>((prev: boolean, currentValue: T) => {
            if (!prev) {
                return prev;
            }

            if (typeof (currentValue) !== "object") {
                return false;
            }

            const keys = Object.keys(currentValue);

            for (let i = 0; i < knownKeys.length; ++i) {
                if (keys.indexOf(knownKeys[i]) < 0) {
                    return false;
                }
            }

            return true;
        }, true);
}

export { usePersistedState, validateArray };
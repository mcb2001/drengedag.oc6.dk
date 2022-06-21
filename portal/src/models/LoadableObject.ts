import { LoadState } from "./";

export interface LoadableObject<TEntity> {
    value: TEntity;
    state: LoadState;
    debug: string;
}

export function getDefaultLoadableObject<T>(defaultValue: T) {
    return {
        value: { ...defaultValue },
        state: LoadState.None,
        debug: ""
    };
}
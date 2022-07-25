import { LoadState } from "./";

export interface LoadableObject<TEntity> {
    value: TEntity;
    state: LoadState;
}
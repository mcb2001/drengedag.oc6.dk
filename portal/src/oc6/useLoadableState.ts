import React from "react";
import { getDefaultLoadableObject, LoadableObject, LoadState } from "../models";

export function useLoadableState<TEntity>(defaultState: TEntity, method: () => Promise<TEntity>): [LoadableObject<TEntity>, React.Dispatch<React.SetStateAction<LoadableObject<TEntity>>>] {
    const [state, setState] = React.useState<LoadableObject<TEntity>>(getDefaultLoadableObject(defaultState));

    React.useEffect(() => {
        if (state.state === LoadState.None) {
            loadState();

            setState({
                ...state,
                state: LoadState.Loading
            });
        }

        async function loadState(): Promise<void> {
            try {
                const newState = await method();

                setState({
                    ...state,
                    value: newState,
                    state: LoadState.Success
                });
            }
            catch (err) {
                console.log(err);

                setState({
                    ...state,
                    state: LoadState.Error,
                    debug: JSON.stringify(err, null, 4)
                });
            }
        }
    }, [state]);

    return [state, setState];
}
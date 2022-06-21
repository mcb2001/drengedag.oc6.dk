import React from "react";
import { getDefaultLoadableObject, LoadableObject, LoadState } from "../models";

export function useLoadableState<TEntity>(defaultState: TEntity, method: () => Promise<TEntity>): [LoadableObject<TEntity>, React.Dispatch<React.SetStateAction<LoadableObject<TEntity>>>] {
    const [state, setState] = React.useState<LoadableObject<TEntity>>(getDefaultLoadableObject(defaultState));

    React.useEffect(() => {
        if (state.state === LoadState.None) {
            loadGames();
            setState({
                ...state,
                state: LoadState.Loading
            });
        }

        async function loadGames(): Promise<void> {
            try {
                const newState = await method();

                console.log(newState);

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
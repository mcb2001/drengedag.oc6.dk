import React, { FC } from "react";

interface ISpinnerContextProps {
    setSpinnerVisibility: (value: boolean) => void;
}

export const SpinnerContext = React.createContext<ISpinnerContextProps>({ setSpinnerVisibility: () => { } });

export function SpinnerContextProvider({ children }: React.PropsWithChildren) {
    const [_, setVisible] = React.useState<boolean>(false);

    return (
        <SpinnerContext.Provider value={{ setSpinnerVisibility: setVisible }}>
            {children}
        </SpinnerContext.Provider>
    );
};
import { IdToken, useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ErrorLoadingView, Headline, SpinnerContainer } from "../components";
import { SelfContext } from "../contexts";
import { HeadlineSize, LoadableObject, LoadState } from "../models";
import { objectToJsonOutput, useDocTitle } from "../oc6";

export function DebugPage(): JSX.Element {
    useDocTitle("Debug information");

    const self = React.useContext(SelfContext);
    const { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = React.useState<LoadableObject<string>>({ value: "", state: LoadState.None });

    React.useEffect(() => {
        if (accessToken.state === LoadState.None) {
            LoadAccessToken();

            setAccessToken({ ...accessToken, state: LoadState.Loading });
        }
    }, [accessToken]);

    async function LoadAccessToken(): Promise<void> {
        try {
            const value = await getAccessTokenSilently();

            setAccessToken({
                ...accessToken,
                value,
                state: LoadState.Success
            });
        }
        catch (error) {
            setAccessToken({
                ...accessToken,
                state: LoadState.Error
            });
        }
    }

    switch (accessToken.state) {
        case LoadState.Error: {
            return <ErrorLoadingView />;
        }
        case LoadState.Success: {
            return (
                <div>
                    <Headline size={HeadlineSize.H1}>Debug information</Headline>
                    <div className="flex flex-row justify-around flex-wrap items-center">
                        <DebugTextArea
                            label="User"
                            text={objectToJsonOutput(user)} />
                        <DebugTextArea
                            label="Self"
                            text={objectToJsonOutput(self)} />
                        <DebugTextArea
                            label="Token"
                            text={"Bearer " + accessToken.value} />
                    </div>
                </div>
            );
        }
        case LoadState.None:
        case LoadState.Loading:
        default: {
            return <SpinnerContainer />;
        }
    }
}

interface IDebugTextAreaProps {
    label: string;
    text: string;
}

const DebugTextArea = (props: IDebugTextAreaProps) => (
    <div className="inline-block md:w-1/3 w-full">
        <Headline size={HeadlineSize.H2}>
            {props.label}
        </Headline>
        <textarea
            className="border inline-block border-solid border-black h-96 w-full"
            readOnly={true}
            value={props.text}
        />
    </div>
);
import { IdToken, useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Headline } from "../components";
import { HeadlineSize, LoadState, UserInfoProps } from "../models";
import { useDocTitle, useLoadableState } from "../oc6";

export function DebugPage(props: UserInfoProps): JSX.Element {
    useDocTitle("Debug information");

    const { self } = props;
    const { getAccessTokenSilently, user, getIdTokenClaims } = useAuth0();
    const [accessToken, setAccessToken] = useLoadableState<string>("", getAccessTokenSilently);

    if (accessToken.state === LoadState.Success) {
        return (
            <div>
                <Headline size={HeadlineSize.H1}>Debug information</Headline>
                <div className="flex flex-row justify-around flex-wrap items-center">
                    <DebugTextArea
                        label="User"
                        text={toJson(user)} />
                    <DebugTextArea
                        label="Self"
                        text={toJson(self)} />
                    <DebugTextArea
                        label="Token"
                        text={"Bearer " + accessToken.value} />
                </div>
            </div>
        );
    }
    else {
        return <h1>Indlæser...</h1>;
    }
}

const toJson = (obj: any) => JSON.stringify(obj, null, 4);

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
            onClick={e => (e.target as HTMLTextAreaElement).select()}
            className="border inline-block border-solid border-black h-96 w-full"
            readOnly={true}
            value={props.text}
        />
    </div>
);
import { IdToken, useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoadState, UserInfoProps } from "../models";
import Oc6 from "../oc6";

export function DebugPage(props: UserInfoProps): JSX.Element {
    Oc6.useDocTitle("Debug information");

    const { self } = props;
    const { getAccessTokenSilently, user, getIdTokenClaims } = useAuth0();
    const [accessToken, setAccessToken] = Oc6.useLoadableState<string>("", getAccessTokenSilently);

    if (accessToken.state === LoadState.Success) {
        return (
            <>
                <h1>Debug information</h1>
                <div className="flex flex-row justify-around">
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
            </>
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
    <label>
        {props.label}
        <br />
        <textarea
            onClick={e => (e.target as HTMLTextAreaElement).select()}
            className="border inline-block border-solid border-black"
            rows={20}
            cols={50}
            readOnly={true}
            value={props.text}
        />
    </label>
);
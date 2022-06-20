import Oc6, { UserInfoProps } from "../oc6";

export function DebugInfo(props: UserInfoProps): JSX.Element {
    const { accessToken } = props;

    Oc6.useDocTitle("Debug information");

    return (
        <>
            <h1>Debug information</h1>
            <textarea
                rows={20}
                cols={100}
                readOnly={true}
                value={accessToken ? "Bearer " + accessToken : ""} />
        </>
    );
}

import { LoadableObject } from "../models";

interface IErrorLoadingViewProps<T> {
    loadableObject: LoadableObject<T>
}

export function ErrorLoadingView<T>(props: IErrorLoadingViewProps<T>) {
    function showDebug() {
        if (process.env.NODE_ENV == "production") {
            return (
                <p>
                    Fejl ved indlæsning. Prøv igen.
                </p>
            );
        }
        else {
            return (
                <p>
                    {props.loadableObject.debug}
                </p>
            );
        }
    }

    return (
        <div>
            <h1>Fejl</h1>
            {showDebug()}
        </div>
    );
};
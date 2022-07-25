import { HeadlineSize, LoadableObject } from "../models";
import { Headline } from "./Headline";

export function ErrorLoadingView() {
    return (
        <div>
            <Headline size={HeadlineSize.H1}>Fejl</Headline>
            <p>Fejl ved indlæsning. Prøv igen.</p>
        </div>
    );
};
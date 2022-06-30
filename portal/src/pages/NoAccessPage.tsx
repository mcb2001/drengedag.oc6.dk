import { Headline } from "../components";
import { HeadlineSize } from "../models";

export function NoAccessPage() {
    return <Headline size={HeadlineSize.H1}>Du har desværre ikke adgang til denne side</Headline>;
}
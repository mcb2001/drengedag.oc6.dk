import React from "react";
import { toast } from "react-toastify";
import { Headline } from "../components";
import { HeadlineSize } from "../models";

export function NoAccessPage() {
    React.useEffect(() => {
        toast.error("Du har desværre ikke adgang til denne side");
    });
    
    return <Headline size={HeadlineSize.H1}>Du har desværre ikke adgang til denne side</Headline>;
}
import React from "react";
import { useDocTitle } from "../util";

function FrontPage(): JSX.Element {
    useDocTitle("Forside");

    return (
        <h1>Front page</h1>
    );
}

export { FrontPage };
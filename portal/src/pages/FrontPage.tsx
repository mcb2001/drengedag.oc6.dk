import React from "react";
import Oc6 from "../oc6";

function FrontPage(): JSX.Element {
    Oc6.useDocTitle("Forside");

    return (
        <h1>Forside</h1>
    );
}

export { FrontPage };
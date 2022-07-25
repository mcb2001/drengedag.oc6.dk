import React from "react";
import { useParams } from "react-router-dom";

type EditPlayerPageRouteParams = {
    id: string;
}

export function EditPlayerPage() {
    const { id } = useParams<EditPlayerPageRouteParams>();

    return (
        <>
            {id}
        </>
    );
}
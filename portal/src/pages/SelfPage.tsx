import React from "react";
import { EditPlayerForm } from "../components";
import { UserInfoProps } from "../models";

export function SelfPage(props: UserInfoProps) {
    return (
        <EditPlayerForm
            player={props.self}
            delete={() => { }}
            update={() => { }}
        />
    );
}
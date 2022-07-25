import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { toast } from "react-toastify";
import { PlayerController } from "../controllers";
import { PlayerDto } from "../models";
import { useDocTitle } from "../oc6";

export function SelfPage() {
    useDocTitle("Profil");

    return (
        <>
            Profil
        </>
    );
}

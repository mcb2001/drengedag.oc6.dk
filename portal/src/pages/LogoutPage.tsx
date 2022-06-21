import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Headline } from "../components";
import { HeadlineSize } from "../models";

export function LogoutPage() {
    const { logout } = useAuth0();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (window.confirm("Logout?")) {
            logout();
            navigate("/");
        }
        else {
            navigate(-1);
        }
    });

    return (
        <Headline size={HeadlineSize.H1}>Logger ud...</Headline>
    );
}
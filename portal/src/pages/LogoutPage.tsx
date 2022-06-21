import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export function LogoutPage() {
    const { logout } = useAuth0();
    const navigate = useNavigate();

    logout();
    navigate("/");

    return (
        <h1>Logger ud...</h1>
    );
}
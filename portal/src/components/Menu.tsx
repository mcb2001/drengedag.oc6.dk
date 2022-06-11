import { useAuth0 } from "@auth0/auth0-react";
import { faHome, faSoccerBall, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
    const { logout } = useAuth0();

    return (
        <div className="menu">
            <NavLink
                className="menu-item"
                to="/">
                <FontAwesomeIcon
                    icon={faHome}
                    className="menu-item-icon" />
                Forside
            </NavLink>
            <NavLink
                className="menu-item"
                to="/teams">
                <FontAwesomeIcon
                    icon={faSoccerBall}
                    className="menu-item-icon" />
                Teams
            </NavLink>
            <NavLink
                className="menu-item"
                to="/players">
                <FontAwesomeIcon
                    icon={faUsers}
                    className="menu-item-icon" />
                Spillere
            </NavLink>
            <button onClick={() => logout()}>
                Logout
            </button>
        </div>
    );
}

export { Menu };
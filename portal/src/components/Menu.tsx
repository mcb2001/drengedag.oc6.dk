import { faHome, faSoccerBall, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
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
        </div>
    );
}

export { Menu };
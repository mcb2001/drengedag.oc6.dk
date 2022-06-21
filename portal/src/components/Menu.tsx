import { faArrowRight, faCogs, faHome, faSoccerBall, faUser, faUsers, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { UserInfoProps } from "../models";

export function Menu(props: UserInfoProps) {
    return (
        <div className="flex flex-row justify-around shadow-lg">
            <MenuLink
                to="/"
                icon={faHome}
                text="Forside"
            />
            <MenuLink
                to="/games"
                icon={faSoccerBall}
                text="Spil"
            />
            <MenuLink
                to="/players"
                icon={faUsers}
                text="Spillere"
            />
            <MenuLink
                to="/debuginfo"
                icon={faCogs}
                text="DebugInfo"
            />
            <MenuLink
                to="/self"
                icon={faUser}
                text="Profil"
            />
            <MenuLink
                to="/logout"
                icon={faArrowRight}
                text="Logout"
                subText={props.self.name}
            />
        </div>
    );
}

interface IMenuLinkProps {
    icon: IconDefinition;
    to: string;
    text: string;
    subText?: string;
}

function MenuLink({ icon, to, text, subText }: IMenuLinkProps) {
    function renderText() {
        if (subText) {
            return (
                <div className="flex flex-col justify-center items-center">
                    <span className="text-center">
                        {text}
                    </span>
                    <span className="text-xs">
                        {subText}
                    </span>
                </div>
            );
        }
        else {
            return (
                <>
                    <span className="text-center">
                        {text}
                    </span>
                </>
            );
        }
    }

    return (
        <NavLink
            className="p-4 text-xl flex flex-row justify-center items-center w-1/6"
            to={to}>
            <FontAwesomeIcon
                className=""
                icon={icon} />
            {renderText()}
        </NavLink>
    );
}

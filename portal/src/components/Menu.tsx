import { faArrowRightFromBracket, faCogs, faHome, faSoccerBall, faUser, faUsers, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

export function Menu() {
    return (
        <div className="flex flex-row justify-around items-center shadow-lg flex-wrap sticky top-0 left-0 bg-white z-20">
            <MenuLink
                to="/"
                icon={faUsers}
                className="border-r"
                text="Spillere"
            />
            <MenuLink
                to="/games"
                icon={faSoccerBall}
                className="border-r"
                text="Spil"
            />
            <MenuLink
                to="/debug"
                icon={faCogs}
                className="border-r"
                text="DebugInfo"
            />
            <MenuLink
                to="/self"
                icon={faUser}
                className="border-r"
                text="Profil"
            />
            <MenuLink
                to="/logout"
                icon={faArrowRightFromBracket}
                text="Logout"
                className=""
                subText={self.name}
            />
        </div>
    );
}

interface IMenuLinkProps {
    icon: IconDefinition;
    to: string;
    text: string;
    subText?: string;
    className: string;
}

function MenuLink({ icon, to, text, subText, className }: IMenuLinkProps) {
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
                </div >
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
        <div className={`inline-block lg:w-1/5 ${className}`}>
            <NavLink
                className="p-4 text-xl flex flex-row justify-center items-center text-black"
                to={to}>
                <FontAwesomeIcon
                    className=""
                    icon={icon} />
                {renderText()}
            </NavLink>
        </div>
    );
}

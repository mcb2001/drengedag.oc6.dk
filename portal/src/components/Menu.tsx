import { faArrowRightFromBracket, faCogs, faHome, faSoccerBall, faUser, faUsers, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { SelfContext } from "../contexts";

export function Menu() {
    const userLinkColor = "text-black";
    const { self } = React.useContext(SelfContext);
    const adminLinkColor = self.isAdmin ? userLinkColor : "text-gray-300";

    return (
        <div className="flex flex-row justify-around items-center shadow-lg flex-wrap sticky top-0 left-0 bg-white z-20">
            <MenuLink
                to="/"
                colorName={adminLinkColor}
                icon={faUsers}
                className="border-r"
                text="Spillere"
            />
            <MenuLink
                to="/games"
                colorName={adminLinkColor}
                icon={faSoccerBall}
                className="border-r"
                text="Spil"
            />
            <MenuLink
                to="/debug"
                colorName={userLinkColor}
                icon={faCogs}
                className="border-r"
                text="DebugInfo"
            />
            <MenuLink
                to="/self"
                colorName="userLinkColor"
                icon={faUser}
                className="border-r"
                text="Profil"
            />
            <MenuLink
                to="/logout"
                colorName="userLinkColor"
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
    colorName: string;
    className: string;
}

function MenuLink({ icon, to, text, subText, colorName, className }: IMenuLinkProps) {
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
                className={`p-4 text-xl flex flex-row justify-center items-center ${colorName}`}
                to={to}>
                <FontAwesomeIcon
                    className=""
                    icon={icon} />
                {renderText()}
            </NavLink>
        </div>
    );
}

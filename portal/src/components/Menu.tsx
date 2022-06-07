import { faHome, faSoccerBall } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Menu() {
    return (
        <div className="menu">
            <a className="menu-item" href="/">
                <FontAwesomeIcon icon={faHome} />
                Forside
            </a>
            <a className="menu-item" href="/bold">
                <FontAwesomeIcon icon={faSoccerBall} />
                Bold
            </a>
        </div>
    );
}

export { Menu };
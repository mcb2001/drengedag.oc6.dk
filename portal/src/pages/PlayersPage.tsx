import { useAuth0 } from "@auth0/auth0-react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorLoadingView, Headline, AddNewButton, Modal, OutlinedButton } from "../components";
import { PlayerContext, SelfContext } from "../contexts";
import { PlayerController } from "../controllers";
import { ButtonColor, getDefaultPlayerDto, HeadlineSize, LoadState, PlayerDto } from "../models";
import { useDocTitle } from "../oc6";

export function PlayersPage() {
    useDocTitle("Spillere");

    const { players } = React.useContext(PlayerContext);
    const { self: { isAdmin } } = React.useContext(SelfContext);

    return (
        <div>
            <div className="bg-blue-300 font-bold py-5 px-2 flex flex-row">
                <div className={isAdmin ? "w-1/2" : "w-2/3"}>
                    Navn
                </div>
                <div className="w-1/3 text-right">
                    Points
                </div>
                {isAdmin && <div className="w-1/6" />}
            </div>
            {players
                .sort((a, b) => a.points - b.points)
                .map(player => (
                    <div key={player.id} className="odd:bg-gray-200 py-5 px-2 flex flex-row">
                        <div className={isAdmin ? "w-1/2" : "w-2/3"}>
                            {player.name}
                        </div>
                        <div className="w-1/3 text-right">
                            {player.points.toLocaleString()}
                        </div>
                        {isAdmin && (
                            <NavLink
                                to={`player/${player.id}`}
                                className="w-1/6 text-center"
                            >
                                <FontAwesomeIcon
                                    icon={faEdit}
                                />
                            </NavLink>
                        )}
                    </div>
                ))
            }
        </div >
    );
}

interface IPlayerViewProps {
    name: string;
    points: string;
    isHeadline?: boolean;
}

function PlayerView({ name, points, isHeadline = false }: IPlayerViewProps) {
    return (
        <div className={`${isHeadline ? "bg-blue-300 font-bold" : "odd:bg-gray-200"} p-5 flex flex-row`}>
            <div className="w-2/3">
                {name}
            </div>
            <div className="w-1/3 text-right">
                {points}
            </div>
        </div>
    );
}
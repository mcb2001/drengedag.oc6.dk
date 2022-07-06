import React from "react";
import { InputForm, OutlinedButton } from ".";
import { ButtonColor, GameDto } from "../models";

interface IEditGameFormProps {
    game: GameDto;
}

export function GameView(props: IEditGameFormProps) {
    return (
        <>
            <p>Game</p>
            <p>Name: <span className="border">{props.game.name}&nbsp;</span></p>
        </>
    );
}
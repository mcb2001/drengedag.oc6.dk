import React from "react";
import { PlayerDto } from "../models";

interface IEditPlayerFormProps {
    player: PlayerDto;
    update: (player: PlayerDto) => PlayerDto;
    delete: (player: PlayerDto) => void;
}

export function EditPlayerForm(props: IEditPlayerFormProps) {
    const [name, setName] = React.useState<string>("");

    return (
        <div>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)} />
            </label>
        </div>
    );
}
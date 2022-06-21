import React from "react";
import { ButtonColor, PlayerDto } from "../models";
import { InputForm, OutlinedButton } from "./";

interface IEditPlayerFormProps {
    player: PlayerDto;
    update: (player: PlayerDto) => void;
    delete: (player: PlayerDto) => void;
}

export function EditPlayerForm(props: IEditPlayerFormProps) {
    const [name, setName] = React.useState<string>(props.player.name);
    const [email, setEmail] = React.useState<string>(props.player.email);

    function save() {
        props.update({
            ...props.player,
            name: name,
            email: email
        });
    }

    return (
        <div className="flex justify-start my-2">
            <InputForm
                label="Id"
                type="text"
                className="w-1/6"
                labelClassName="w-1/12"
                value={props.player.id <= 0 ? "" : props.player.id.toString()}
                readOnly={true} />
            <InputForm
                label="Name"
                type="text"
                className="w-1/6"
                labelClassName="w-1/12"
                value={name}
                readOnly={props.player.id <= 0}
                onChange={(event) => setName(event.target.value)}
            />
            <InputForm
                label="Email"
                type="text"
                className="w-1/6"
                labelClassName="w-1/12"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <OutlinedButton
                className="w-1/6 mx-2"
                buttonColor={ButtonColor.Lime}
                onClick={() => save()}
            >
                Gem
            </OutlinedButton>
            <OutlinedButton
                disabled={props.player.id <= 0}
                className="w-1/12 mx-2"
                buttonColor={ButtonColor.Orange}
                onClick={() => props.delete(props.player)}
            >
                Slet
            </OutlinedButton>
        </div>
    );
}


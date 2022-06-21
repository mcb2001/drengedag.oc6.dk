import React from "react";
import { ButtonColor, PlayerDto, UserInfoProps } from "../models";
import { classNames } from "../oc6";
import { InputForm, OutlinedButton } from "./";

interface IEditPlayerFormProps {
    player: PlayerDto;
    update: (player: PlayerDto) => void;
    delete: (player: PlayerDto) => void;
    isSelfEdit?: boolean;
}

export function EditPlayerForm({ isSelfEdit = false, ...props }: IEditPlayerFormProps) {

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
        <div className="flex justify-start my-2 items-center shadow-lg border flex-wrap mb-6">
            <InputForm
                label="Id"
                type="text"
                value={props.player.id <= 0 ? "" : props.player.id.toString()}
                readOnly={true} />
            <InputForm
                label="Name"
                type="text"
                value={name}
                readOnly={props.player.id <= 0}
                onChange={(event) => setName(event.target.value)}
            />
            <InputForm
                label="Email"
                type="text"
                value={email}
                readOnly={isSelfEdit}
                onChange={(event) => setEmail(event.target.value)}
            />
            <OutlinedButton
                className="lg:w-2/12 w-full"
                buttonColor={ButtonColor.Lime}
                onClick={() => save()}
            >
                {props.player.id <= 0 ? "Opret" : "Gem"}
            </OutlinedButton>
            <OutlinedButton
                disabled={isSelfEdit || props.player.id <= 0}
                className="lg:w-1/12 w-full"
                buttonColor={ButtonColor.Orange}
                onClick={() => props.delete(props.player)}
            >
                Slet
            </OutlinedButton>
        </div>
    );
}


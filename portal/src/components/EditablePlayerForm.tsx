import React from "react";
import { Player } from "../models";

interface IProps {
    player: Player;
    submit: (player: Player) => void;
}

function EditablePlayerForm(props: IProps) {
    const { player, submit } = props;
    const [name, setName] = React.useState(player.name);

    function localSubmit() {
        submit({ ...player, name: name });
    }

    return (
        <div className="player">
            <input
                type="text"
                value={name}
                onChange={event => setName(event.target.value)} />
            <button type="button"
                onClick={() => localSubmit()}>
                Gem
            </button>
        </div>
    );
}

export { EditablePlayerForm };
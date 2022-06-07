import { Player } from "../models";

interface IProps {
    player: Player
}

function PlayerView(props: IProps) {
    const { player: { name } } = props;


    return (
        <div className="player">
            {name}
        </div>
    );
}

export { PlayerView };
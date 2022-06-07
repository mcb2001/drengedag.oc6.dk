import React from "react";
import { Random } from "../util/Random";
import { useDocTitle } from "../util";
import { PlayerContext } from "../App";
import { PlayerView } from "../components";

function TeamsPage() {
    const [items, setItems] = React.useState<Array<number>>([]);

    useDocTitle("Spil");

    React.useEffect(() => {
        if (items.length === 0) {
            const newItems: Array<number> = [];

            for (let i = 0; i < 100; ++i) {
                newItems.push(Random.next(0, 1000));
            }

            setItems(newItems);
        }
    }, [items]);

    function shuffle() {
        const newItems = [...items];
        newItems.shuffle();
        setItems(newItems);
    }

    function sort() {
        const newItems = [...items];
        newItems.sort((a, b) => a - b);
        setItems(newItems);
    }

    return (
        <PlayerContext.Consumer>
            {({ players, addPlayer }) => {
                return (
                    <div className="players">
                        <h1>Teams</h1>
                        {players.map((player, index) => <PlayerView player={player} key={index} />)}
                    </div>
                );
            }}
        </PlayerContext.Consumer>
    );
}

export { TeamsPage };
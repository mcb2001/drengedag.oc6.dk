import React from "react";
import { Random } from "../util/Random";

function BoldPage() {
    const [items, setItems] = React.useState<Array<number>>([]);

    React.useEffect(() => {
        if (items.length === 0) {
            const newItems: Array<number> = [];

            for (let i = 0; i < 100; ++i) {
                newItems.push(Random.next(0, 1000));
            }

            setItems(newItems);
        }
    }, [items]);

    function randomize() {
        const newItems = [...items];
        newItems.shuffle();
        setItems(newItems);
    }

    return (
        <>
            <h1>Bolddag</h1>
            <button
                type="button"
                onClick={() => randomize()}>
                Randomize
            </button>
            {items.map((value, index) => <div key={index}>{value}</div>)}
        </>
    );
}

export { BoldPage };
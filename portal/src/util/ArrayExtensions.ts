import { Random } from "./Random";

declare global {
    interface Array<T> {
        shuffle: () => void;
    }
}

Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; --i) {
        const j = Random.next(0, i + 1);
        const a = this[i];
        this[i] = this[j];
        this[j] = a;
    }
};

export { };
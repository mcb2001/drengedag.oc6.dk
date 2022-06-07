export class Random {
    public static next = (fromIncluding: number, toExcluding: number) => Math.round(Math.random() * (toExcluding - fromIncluding)) + fromIncluding;
}
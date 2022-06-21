export interface PlayerDto {
    id: number;
    name: string;
    email: string;
    auth0UserId: string | null;
    points: number;
    wins: number;
}

export const getDefaultPlayerDto = () => ({
    id: -Math.random(),
    name: "",
    email: "",
    auth0UserId: null,
    points: 0,
    wins: 0
});
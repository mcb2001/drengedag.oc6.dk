export interface PlayerDto {
    id: number;
    name: string;
    email: string;
    auth0UserId: string | null;
    points: number;
    wins: number;
    isAdmin: boolean;
}

export const getDefaultPlayerDto: () => PlayerDto = () => ({
    id: -Math.random(),
    name: "",
    email: "",
    auth0UserId: null,
    points: 0,
    wins: 0,
    isAdmin: false
});
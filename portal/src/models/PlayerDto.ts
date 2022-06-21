export interface PlayerDto {
    id: number;
    name: string;
    email: string;
    auth0UserId: string | null;
    points: number;
    wins: number;
}

const DEFAULT_PLAYER: PlayerDto = {
    id: 0,
    name: "",
    email: "",
    auth0UserId: null,
    points: 0,
    wins: 0
};

export function getDefaultPlayerDto() {
    return { ...DEFAULT_PLAYER };
}
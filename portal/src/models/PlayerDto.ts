export interface PlayerDto {
    id: number;
    name: string;
    email: string;
    auth0UserId: string | null;
    points: number;
    wins: number;
}

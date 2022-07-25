import { PlayerDto } from ".";

export interface TeamCreateResponse {
    teamCount: number;
    teams: Array<Array<number>>;
}

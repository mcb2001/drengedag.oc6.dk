import { TeamDto } from "./";

export interface GameDto {
    id: number;
    name: string;
    isActive: boolean;
    teams: Array<TeamDto>;
}

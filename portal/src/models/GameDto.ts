import { TeamDto } from "./";

export interface GameDto {
    id: number;
    name: string;
    isActive: boolean;
    teams: Array<TeamDto>;
}

export const getDefaultGameDto: () => GameDto = () => ({
    id: -Math.random(),
    name: "",
    isActive: false,
    teams: []
});
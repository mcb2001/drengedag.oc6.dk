export interface NewGameRequest {
    name: string;
    teamCount: number;
    participantIds: Array<number>;
}

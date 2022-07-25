import { PlayerDto, TeamCreateRequest, TeamCreateResponse } from "../models";
import { AbstractController } from ".";

class DefaultTeamController extends AbstractController {
    public constructor() {
        if (process.env.NODE_ENV === "development") {
            super("https://localhost:7155/api/team");
        }
        else {
            super("/api/team");
        }
    }

    public async get(token: string): Promise<TeamCreateResponse> {
        return await this.getRequest("/", token);
    }

    public async post(teamCreateRequest: TeamCreateRequest, token: string): Promise<TeamCreateResponse> {
        return await this.postRequest("/", token, teamCreateRequest);
    }
}

export const TeamController: DefaultTeamController = new DefaultTeamController();
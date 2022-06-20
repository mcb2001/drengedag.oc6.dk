import { AbstractController } from ".";
import { FinishGameRequest, GameDto, NewGameRequest } from "../models";

export class GameController extends AbstractController {
    public constructor() {
        if (process.env.NODE_ENV === "development") {
            super("https://localhost:7155/api/game");
        }
        else {
            super("/api/game");
        }
    }

    public async getById(id: number): Promise<GameDto> {
        return await this.getRequest("/" + id);
    }

    public async getAll(): Promise<Array<GameDto>> {
        return await this.getRequest("/");
    }

    public async post(request: NewGameRequest): Promise<GameDto> {
        return await this.postRequest("/", request);
    }

    public async finishGame(request: FinishGameRequest): Promise<GameDto> {
        return await this.putRequest("/finish", request);
    }
}
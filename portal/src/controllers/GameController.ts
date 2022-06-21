import { AbstractController } from ".";
import { FinishGameRequest, GameDto, NewGameRequest } from "../models";

class DefaultGameController extends AbstractController {
    public constructor() {
        if (process.env.NODE_ENV === "development") {
            super("https://localhost:5001/api/game");
        }
        else {
            super("/api/game");
        }
    }

    public async getById(id: number, token: string): Promise<GameDto> {
        return await this.getRequest("/" + id, token);
    }

    public async getAll(token: string): Promise<Array<GameDto>> {
        return await this.getRequest("/", token);
    }

    public async post(request: NewGameRequest, token: string): Promise<GameDto> {
        return await this.postRequest("/", token, request);
    }

    public async finishGame(request: FinishGameRequest, token: string): Promise<GameDto> {
        return await this.putRequest("/finish", token, request);
    }
}

export const GameController: DefaultGameController = new DefaultGameController();
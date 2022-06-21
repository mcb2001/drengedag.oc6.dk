import { PlayerDto } from "../models";
import { AbstractController } from "./";

class DefaultPlayerController extends AbstractController {
    public constructor() {
        if (process.env.NODE_ENV === "development") {
            super("https://localhost:7155/api/player");
        }
        else {
            super("/api/player");
        }
    }

    public async getById(id: number, token: string): Promise<PlayerDto> {
        return await this.getRequest("/" + id, token);
    }

    public async getAll(token: string): Promise<Array<PlayerDto>> {
        return await this.getRequest("/", token);
    }

    public async self(token: string): Promise<PlayerDto> {
        return await this.getRequest("/self", token);
    }

    public async post(player: PlayerDto, token: string): Promise<PlayerDto> {
        return await this.postRequest("/", token, player);
    }

    public async put(player: PlayerDto, token: string): Promise<PlayerDto> {
        return await this.putRequest("/", token, player);
    }

    public async delete(id: number, token: string): Promise<void> {
        await this.deleteRequest("/" + id, token);
    }
}

export const PlayerController: DefaultPlayerController = new DefaultPlayerController();
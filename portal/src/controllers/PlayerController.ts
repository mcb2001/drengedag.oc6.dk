import { PlayerDto } from "../models";
import { AbstractController } from "./";

export class PlayerController extends AbstractController {
    public constructor() {
        if (process.env.NODE_ENV === "development") {
            super("https://localhost:7155/api/player");
        }
        else {
            super("/api/player");
        }
    }

    public async getById(id: number): Promise<PlayerDto> {
        return await this.getRequest("/" + id);
    }

    public async getAll(): Promise<Array<PlayerDto>> {
        return await this.getRequest("/");
    }

    public async self(): Promise<PlayerDto> {
        return await this.getRequest("/self");
    }

    public async post(player: PlayerDto): Promise<PlayerDto> {
        return await this.postRequest("/", player);
    }

    public async put(player: PlayerDto): Promise<PlayerDto> {
        return await this.putRequest("/", player);
    }

    public async delete(id: number): Promise<void> {
        await this.deleteRequest("/" + id);
    }
}

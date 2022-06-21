import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { toast } from "react-toastify";
import { EditPlayerForm } from "../components";
import { PlayerController } from "../controllers";
import { PlayerDto, UserInfoProps } from "../models";

export function SelfPage(props: UserInfoProps) {
    const { getAccessTokenSilently } = useAuth0();

    async function update(player: PlayerDto): Promise<void> {
        try {
            const token = await getAccessTokenSilently();

            props.reloadSelf();

            await PlayerController.updateSelf(player, token);

            toast.info("Profil opdateret");
        }
        catch (err) {
            console.log(err);

            props.reloadSelf();

            toast.error("Kunne ikke gemme");
        }
    }

    return (
        <EditPlayerForm
            isSelfEdit={true}
            player={props.self}
            delete={() => { }}
            update={(p: PlayerDto) => update(p)}
        />
    );
}

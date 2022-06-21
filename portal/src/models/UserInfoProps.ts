import { PlayerDto } from ".";

export interface UserInfoProps extends React.PropsWithChildren<{}> {
    self: PlayerDto;
}

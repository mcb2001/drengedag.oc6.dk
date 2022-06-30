import { PlayerDto } from ".";

export interface UserInfoProps extends React.PropsWithChildren<{}> {
    self: PlayerDto;
    reloadSelf: () => Promise<void>;
    setSpinnerVisible: (visible: boolean) => void;
}

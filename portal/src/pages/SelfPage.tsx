import { useAuth0 } from "@auth0/auth0-react";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import { OutlinedButton } from "../components";
import { SelfContext } from "../contexts";
import { PlayerController } from "../controllers";
import { ButtonColor, PlayerDto } from "../models";
import { useDocTitle } from "../oc6";

export function SelfPage() {
    useDocTitle("Profil");

    const { self, updateSelf } = React.useContext(SelfContext);

    const [name, setName] = React.useState<string>(self.name);

    function save() {
        updateSelf({ ...self, name });
    }

    return (
        <div className="flex flex-col">
            <InputBox
                label="Id"
                readOnly={true}
                value={self.id} />
            <InputBox
                label="Email"
                readOnly={true}
                value={self.email} />
            <InputBox
                label="Name"
                onChange={(event) => setName(event.target.value)}
                value={name} />
            <OutlinedButton
                onClick={() => save()}
                buttonColor={ButtonColor.Lime}>
                <FontAwesomeIcon
                    icon={faSave} />
                Gem
            </OutlinedButton>
        </div >
    );
}

interface IInputBoxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
}

function InputBox({ label, readOnly, ...props }: IInputBoxProps) {
    return (
        <label className={`mb-5 flex flex-row w-full ${readOnly ? "bg-gray-100" : ""}`}>
            <div className="inline-block w-1/3 p-5">{label}:</div>
            <input
                className={`w-2/3 inline-block p-5 text-xl ${readOnly ? "bg-gray-100" : "border"}`}
                readOnly={readOnly}
                {...props} />
        </label>
    );
}
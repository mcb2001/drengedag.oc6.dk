import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IAddNewButtonProps {
    onClick: () => void;
}

export const AddNewButton = ({ onClick }: IAddNewButtonProps) => (
    <button
        onClick={() => onClick()}
        className="fixed bottom-8 right-8 w-24 h-24 hover:text-lime-500 focus:text-lime-500">
        <FontAwesomeIcon
            className="text-7xl"
            icon={faPlusCircle}
        />
    </button>
);
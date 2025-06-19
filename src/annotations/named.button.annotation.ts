import {GlobalVariables} from "../classes/application/GlobalVariables";

export const NamedButton = (button: string) => {
    return function (target: Function) {
        GlobalVariables.BUTTONS.set(button, target);
    };
};

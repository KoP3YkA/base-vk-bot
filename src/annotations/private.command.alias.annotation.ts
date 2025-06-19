import {GlobalVariables} from "../classes/application/GlobalVariables";

export const PrivateCommandAlias = (command: string) => {
    return function (target: Function) {
        GlobalVariables.PRIVATE_COMMAND_ALIASES.set(command, target);
    };
};

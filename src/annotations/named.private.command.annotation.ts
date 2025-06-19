import {GlobalVariables} from "../classes/application/GlobalVariables";

export const NamedPrivateCommand = (command: string) => {
    return function (target: Function) {
        GlobalVariables.PRIVATE_COMMANDS.set(command, target);
    }
}
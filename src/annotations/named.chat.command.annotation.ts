import {GlobalVariables} from "../classes/application/GlobalVariables";

export const NamedChatCommand = (command: string) => {
    return function (target: Function) {
        GlobalVariables.CHAT_COMMANDS.set(command, target);
    }
}
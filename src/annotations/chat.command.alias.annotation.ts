import {GlobalVariables} from "../classes/application/GlobalVariables";

export const ChatCommandAlias = (alias: string) => {
    return function (target: Function) {
        GlobalVariables.CHAT_COMMAND_ALIASES.set(alias, target);
    }
}
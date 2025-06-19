import {BaseClientEvent} from "./BaseClientEvent";
import {MessageContext} from "vk-io";
import {User} from "../entities/User";
import {ChatCommandExecutor} from "../executors/ChatCommandExecutor";
import {GlobalVariables} from "../application/GlobalVariables";
import {CallbackButton} from "../../interfaces/callback.button.interface";
import {Nothing} from "../../types/nothing.type";
import {Main} from "../../main";
import {PrivateCommandExecutor} from "../executors/PrivateCommandExecutor";

export class PrivateMessageEvent extends BaseClientEvent {
    public readonly sender : User;
    public readonly text : string;
    public readonly firstArgument : string | null = null;
    public readonly args : string[] = [];

    public constructor(
        public readonly apiEvent : MessageContext & { isChat: false }
    ) {
        super();
        this.sender = new User(apiEvent.senderId);
        this.text = apiEvent.text ?? "";

        const splitText : string[] = this.text.split(' ')
        if (splitText.length === 0 || splitText[0].length <= 1) return;
        this.firstArgument = splitText[0].slice(1);
        this.args = splitText.slice(1);
    }

    public findExecutor() : PrivateCommandExecutor | null {
        if (!this.firstArgument) return null;
        const command : Function | undefined = GlobalVariables.PRIVATE_COMMANDS.get(this.firstArgument);
        if (command) return new (command as new () => PrivateCommandExecutor)();

        const alias : Function | undefined = GlobalVariables.PRIVATE_COMMAND_ALIASES.get(this.firstArgument);
        if (alias) return new (alias as new () => PrivateCommandExecutor)();

        return null;
    }

    public async replyLocalizedMessage(path: string, rename?: Record<string, unknown>, ...buttons: CallbackButton[]) : Nothing {
        await this.apiEvent.reply({
            message: Main.localization.getLocalizedText(path, rename),
            keyboard: this.getKeyboardFromCallbackButtons(buttons),
            disable_mentions: true
        }).catch(() => {})
    }

    public async sendLocalizedMessage(path: string, rename?: Record<string, unknown>, ...buttons: CallbackButton[]) : Nothing {
        await this.apiEvent.send({
            message: Main.localization.getLocalizedText(path, rename),
            keyboard: this.getKeyboardFromCallbackButtons(buttons),
            random_id: 0
        }).catch(() => {})
    }

}
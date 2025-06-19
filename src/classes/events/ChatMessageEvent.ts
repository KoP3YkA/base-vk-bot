import {MessageContext} from "vk-io";
import {BaseClientEvent} from "./BaseClientEvent";
import {Member} from "../entities/Member";
import {Chat} from "../entities/Chat";
import {GlobalVariables} from "../application/GlobalVariables";
import {BaseExecutor} from "../executors/BaseExecutor";
import {ChatCommandExecutor} from "../executors/ChatCommandExecutor";
import Func = jest.Func;
import {Nothing} from "../../types/nothing.type";
import {Main} from "../../main";
import {CallbackButton} from "../../interfaces/callback.button.interface";
import {PrivateCommandExecutor} from "../executors/PrivateCommandExecutor";

export class ChatMessageEvent extends BaseClientEvent {
    public readonly sender: Member;
    public readonly chat: Chat;
    public readonly text: string;
    public readonly firstArgument: string | null = null;
    public readonly args: string[] = [];

    public constructor(
        public readonly apiEvent: MessageContext & {chatId: number}
    ) {
        super();
        this.sender = new Member(apiEvent.senderId, apiEvent.chatId);
        this.chat = this.sender.chat;
        this.text = apiEvent.text ?? "";

        const splitText: string[] = this.text.split(" ");
        if (splitText.length === 0 || splitText[0].length <= 1) return;
        this.firstArgument = splitText[0].slice(1);
        this.args = splitText.slice(1);
    }

    public findExecutor(): ChatCommandExecutor | null {
        if (!this.firstArgument) return null;
        const command: Function | undefined = GlobalVariables.CHAT_COMMANDS.get(
            this.firstArgument
        );
        if (command) return new (command as new () => ChatCommandExecutor)();

        const alias: Function | undefined =
            GlobalVariables.CHAT_COMMAND_ALIASES.get(this.firstArgument);
        if (alias) return new (alias as new () => ChatCommandExecutor)();

        return null;
    }

    public async replyLocalizedMessage(
        path: string,
        rename?: Record<string, unknown>,
        ...buttons: CallbackButton[]
    ): Nothing {
        await this.apiEvent
            .reply({
                message: Main.localization.getLocalizedText(path, rename),
                keyboard: this.getKeyboardFromCallbackButtons(buttons),
                disable_mentions: true,
            })
            .catch(() => {});
    }

    public async sendLocalizedMessage(
        path: string,
        rename?: Record<string, unknown>,
        ...buttons: CallbackButton[]
    ): Nothing {
        await this.apiEvent
            .send({
                message: Main.localization.getLocalizedText(path, rename),
                keyboard: this.getKeyboardFromCallbackButtons(buttons),
                random_id: 0,
            })
            .catch(() => {});
    }
}

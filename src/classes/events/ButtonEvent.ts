import {BaseClientEvent} from "./BaseClientEvent";
import {MessageEventContext} from "vk-io";
import {User} from "../entities/User";
import {Chat} from "../entities/Chat";
import {Nothing} from "../../types/nothing.type";
import {Rename} from "yml-localization";
import {Main} from "../../main";
import {ChatCommandExecutor} from "../executors/ChatCommandExecutor";
import {GlobalVariables} from "../application/GlobalVariables";
import {ButtonExecutor} from "../executors/ButtonExecutor";

export class ButtonEvent extends BaseClientEvent {
    public readonly sender : User;
    public readonly command : string;
    public readonly chat : Chat | null;

    public constructor(
        public readonly apiEvent : MessageEventContext
    ) {
        super();
        this.command = this.getPayloadByKey('command');
        this.sender = new User(apiEvent.userId);
        if (apiEvent.peerId === apiEvent.userId) this.chat = null;
        else this.chat = new Chat(apiEvent.peerId - 2_000_000_000);
    }

    public getPayloadByKey(key: string) : string {
        return String(this.apiEvent.eventPayload[key])
    }

    public async showSnackbar(message: string) : Nothing {
        await this.apiEvent.answer({
            type: 'show_snackbar',
            text: message
        }).catch(() => {})
    }

    public showLocalizedSnackbar = async (path: string, rename: Rename = {}) : Nothing => await this.showSnackbar(Main.localization.getLocalizedText(path, rename))

    public findExecutor() : ButtonExecutor | null {
        if (!this.command) return null;
        const command : Function | undefined = GlobalVariables.BUTTONS.get(this.command);
        if (command) return new (command as new () => ButtonExecutor)();
        return null;
    }

}
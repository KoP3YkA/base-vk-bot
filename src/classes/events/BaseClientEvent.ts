import {ButtonColorUnion, KeyboardBuilder} from "vk-io";
import {CallbackButton} from "../../interfaces/callback.button.interface";

export abstract class BaseClientEvent {
    public abstract readonly apiEvent : unknown;

    protected getKeyboardFromCallbackButtons(button: CallbackButton[]) : KeyboardBuilder {
        const keyboard = new KeyboardBuilder()
        keyboard.inline(true)
        for (const i of button) {
            if (i.line) {
                keyboard.row()
            }
            keyboard.callbackButton({
                label: i.title,
                color: i.color as ButtonColorUnion,
                payload: i.payload
            })
        }
        return keyboard
    }
}
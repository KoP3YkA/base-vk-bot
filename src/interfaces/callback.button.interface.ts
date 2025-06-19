import {Color} from "../classes/enums/Color";

export interface CallbackButton {
    title: string,
    color: Color,
    payload: { command : string, [key: string] : unknown },
    line?: boolean
}
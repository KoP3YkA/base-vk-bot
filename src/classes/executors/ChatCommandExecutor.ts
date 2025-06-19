import {BaseExecutor} from "./BaseExecutor";
import {Nothing} from "../../types/nothing.type";
import {ChatMessageEvent} from "../events/ChatMessageEvent";

export class ChatCommandExecutor extends BaseExecutor {
    public async execute(command: ChatMessageEvent, dto?: any): Nothing {}
}

import {BaseExecutor} from "./BaseExecutor";
import {Nothing} from "../../types/nothing.type";
import {PrivateMessageEvent} from "../events/PrivateMessageEvent";

export class PrivateCommandExecutor extends BaseExecutor {

    public async execute(command: PrivateMessageEvent, dto?: any) : Nothing {}

}
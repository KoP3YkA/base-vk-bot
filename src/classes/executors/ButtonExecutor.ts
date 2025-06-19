import {BaseExecutor} from "./BaseExecutor";
import {Nothing} from "../../types/nothing.type";
import {ButtonEvent} from "../events/ButtonEvent";

export abstract class ButtonExecutor extends BaseExecutor {

    public async execute(message: ButtonEvent) : Nothing {
        
    }

}
import {ChatCommandExecutor} from "../../src/classes/executors/ChatCommandExecutor";
import {ChatMessageEvent} from "../../src/classes/events/ChatMessageEvent";
import {Nothing} from "../../src/types/nothing.type";
import {
    StringProperty,
    UserProperty,
} from "../../src/annotations/dto.params.annotation";
import {User} from "../../src/classes/entities/User";
import {InjectableDto} from "../../src/annotations/injectable.dto.annotation";
import {BaseCommandException} from "../../src/classes/exceptions/BaseCommandException";
import {NamedChatCommand} from "../../src/annotations/named.chat.command.annotation";
import {ChatCommandAlias} from "../../src/annotations/chat.command.alias.annotation";

class DTO {
    @UserProperty
    public user!: User;
    @StringProperty
    public reason!: string;
}

@NamedChatCommand("example")
@ChatCommandAlias("ex")
export class ExampleCommand extends ChatCommandExecutor {
    public override async execute(
        command: ChatMessageEvent,
        @InjectableDto dto: DTO
    ): Nothing {
        throw new BaseCommandException("some_path");
    }
}

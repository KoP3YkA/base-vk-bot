import {Nothing} from "../../types/nothing.type";
import {API, MessageContext, MessageEventContext, VK} from "vk-io";
import {ChatMessageEvent} from "../events/ChatMessageEvent";
import {PrivateMessageEvent} from "../events/PrivateMessageEvent";
import {ButtonEvent} from "../events/ButtonEvent";
import {ChatCommandExecutor} from "../executors/ChatCommandExecutor";
import {CommandDtoAdapter} from "../adapter/CommandDtoAdapter";
import {BaseCommandException} from "../exceptions/BaseCommandException";
import {PrivateCommandExecutor} from "../executors/PrivateCommandExecutor";
import {BaseExecutor} from "../executors/BaseExecutor";
import {BaseClientEvent} from "../events/BaseClientEvent";
import {ButtonExecutor} from "../executors/ButtonExecutor";

export class Client {
    public static bot : VK;
    public static api : API;

    public constructor(private readonly token: string) {}
    
    public async startPolling() : Nothing {
        const bot : VK = new VK({ token: this.token });
        Client.bot = bot;
        Client.api = bot.api;

        bot.updates.on('message_new', async (context) => {
            if (typeof context.chatId === 'number') return this.onChatMessage(context as MessageContext & { chatId: number });
            else return this.onPrivateMessage(context as MessageContext & { isChat: false })
        })

        bot.updates.on('message_event', async (context) => {
            return this.onButtonEvent(context);
        })

        await bot.updates.startPolling();
    }
    
    private async executeCommand(executor: BaseExecutor, event: ChatMessageEvent | PrivateMessageEvent) : Nothing {
        const paramTypes = Reflect.getMetadata("design:paramtypes", executor, "execute");
        const dtoIndex = Reflect.getMetadata("injectable-dto", executor, "execute");

        for (let i = 0; i < paramTypes.length; i++) {
            if (i === dtoIndex) {
                const DtoClass = paramTypes[i];
                const dto = await CommandDtoAdapter.getDto(DtoClass, event.args).catch(() => null);
                if (dto === null) {
                    await event.replyLocalizedMessage("invalid_arguments")
                    return
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return await executor.execute(event, dto as Function).catch(async err => {
                    if (err instanceof BaseCommandException) await event.replyLocalizedMessage(err.path);
                });
            }
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await executor.execute(event).catch(async err => {
            if (err instanceof BaseCommandException) await event.replyLocalizedMessage(err.path);
        });
    }
    
    private async onChatMessage(
        context: MessageContext & { chatId: number }
    ) : Nothing {
        const event : ChatMessageEvent = new ChatMessageEvent(context);
        const executor : ChatCommandExecutor | null = event.findExecutor();
        if (!executor) return;
        await this.executeCommand(executor, event);
    }

    private async onPrivateMessage(
        context: MessageContext & { isChat: false }
    ) : Nothing {
        const event : PrivateMessageEvent = new PrivateMessageEvent(context);
        const executor : PrivateCommandExecutor | null = event.findExecutor();
        if (!executor) return;
        await this.executeCommand(executor, event);
    }

    private async onButtonEvent(
        context: MessageEventContext
    ) : Nothing {
        const event : ButtonEvent = new ButtonEvent(context);
        const executor : ButtonExecutor | null = event.findExecutor();
        if (!executor) return;
        await executor.execute(event).catch(async (err) => {
            if (err instanceof BaseCommandException) await event.showLocalizedSnackbar(err.path);
        })
    }

}
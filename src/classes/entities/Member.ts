import {User} from "./User";
import {Chat} from "./Chat";

export class Member extends User {
    public readonly chat: Chat;

    public constructor(
        userId: number,
        public readonly chatId: number
    ) {
        super(userId);
        this.chat = new Chat(chatId);
    }
}

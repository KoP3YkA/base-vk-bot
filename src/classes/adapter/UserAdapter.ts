import {User} from "../entities/User";
import {Regex} from "../utils/Regex";

export class UserAdapter {
    public static getIdFromArgument(
        args: string[],
        arg: number = 0,
        allowGroups: boolean = false
    ): User | null {
        const argsList: Array<string> = args;
        if (argsList.length < arg + 1) return null;
        const currencyText: string = argsList[arg];

        let userId: number | string;
        if (!isNaN(+currencyText)) {
            userId = +currencyText;
            if ((userId < 0 && !allowGroups) || userId === 0) return null;
            return new User(+currencyText);
        }

        let match: RegExpMatchArray | null;
        if ((match = currencyText.match(Regex.USER_OR_GROUP_MENTION))) {
            userId = currencyText.startsWith("[club")
                ? ~+match[2] + 1
                : +match[2];
            return userId < 0 && !allowGroups ? null : new User(userId);
        }

        if ((match = currencyText.match(Regex.URL_GET))) {
            userId = match[1];
            if (isNaN(+userId)) {
                const user = new User(+userId);
                return user.userId && (user.userId > 0 || allowGroups)
                    ? new User(user.userId)
                    : null;
            }
            userId = +userId;
            return userId && (userId > 0 || allowGroups)
                ? new User(userId)
                : null;
        }

        const user = new User(+currencyText);
        return user.userId && (user.userId > 0 || allowGroups)
            ? new User(user.userId)
            : null;
    }
}

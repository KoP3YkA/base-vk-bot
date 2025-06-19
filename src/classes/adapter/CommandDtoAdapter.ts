import {UserAdapter} from "./UserAdapter";

export class CommandDtoAdapter {
    public static async getDto<T>(
        dtoClass: new () => T,
        args: string[]
    ): Promise<T> {
        const instance: T = new dtoClass();

        const props: {key: string; type: string}[] =
            Reflect.getMetadata("dto-properties", dtoClass) || [];

        let count: number = 0;
        for (const {key, type} of props) {
            let value;

            switch (type) {
                case "integer": {
                    const val = +args[count];
                    if (isNaN(val)) throw new Error("Value is not number");
                    value = val;
                    break;
                }
                case "word": {
                    value = args[count];
                    break;
                }
                case "string": {
                    value = args.slice(count).join(" ");
                    count = args.length;
                    break;
                }
                case "user": {
                    const user = UserAdapter.getIdFromArgument(
                        args,
                        count,
                        false
                    );
                    if (!user) throw new Error("User not found");
                    value = user;
                    break;
                }
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            instance[key as keyof T] = value as string;
            count++;
        }

        return instance;
    }
}

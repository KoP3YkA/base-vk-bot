export class EnvironManager {

    public static getEnvironField<T = string>(path: string, transformer?: (value: string) => T) : T {
        const value : string | undefined = process.env[path];
        if (!value) throw new Error(`Environ field ${path} is undefined`);
        if (transformer) return transformer(value);
        return value as T;
    }

}
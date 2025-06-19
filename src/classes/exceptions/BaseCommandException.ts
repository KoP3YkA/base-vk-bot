export class BaseCommandException extends Error {

    constructor(public readonly path: string) {
        super(path);
    }

}
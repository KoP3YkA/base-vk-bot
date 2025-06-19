import "reflect-metadata";

export const INJECTABLE_DTO_KEY = Symbol("injectable-dto");

export const InjectableDto = (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
) => {
    Reflect.defineMetadata(
        INJECTABLE_DTO_KEY,
        parameterIndex,
        target,
        propertyKey
    );
};

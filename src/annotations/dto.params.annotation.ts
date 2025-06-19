import 'reflect-metadata'

function defineProperty(target: Function, propertyKey: string, type: string) {
    const props: { key: string; type: string }[] =
        Reflect.getMetadata("dto-properties", target.constructor) || [];

    props.push({ key: propertyKey, type });

    Reflect.defineMetadata("dto-properties", props, target.constructor);
}

export function UserProperty(target: any, propertyKey: string) {
    defineProperty(target, propertyKey, "user")
}

export function IntegerProperty(target: any, propertyKey: string) {
    defineProperty(target, propertyKey, "integer")
}

export function WordProperty(target: any, propertyKey: string) {
    defineProperty(target, propertyKey, "word")
}

export function StringProperty(target: any, propertyKey: string) {
    defineProperty(target, propertyKey, "string")
}
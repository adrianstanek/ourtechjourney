export function isString<T>(x: T): boolean {
    return typeof x === 'string';
}

export const isStringOrNull = (x: string | undefined | null): x is string => {
    return (x as string) !== undefined;
};

export const isNumber = (x: number | undefined | null): x is number => {
    return (x as number) !== undefined && (x as number) !== null;
};

export const isBoolean = (x: unknown): x is boolean => {
    return (x as boolean) !== undefined && (x as boolean) !== null;
};

export const isNumberOrNull = (x: number | undefined | null): x is number => {
    return (x as number) !== undefined;
};

export function isDefined<T>(x: T): x is NonNullable<T> {
    return x !== undefined && x !== null;
}

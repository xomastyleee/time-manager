
export function stringToEnum<T>(enumType: T, value: string[]): (T[keyof T] | undefined)[] {
    return value.map(key => enumType[key as keyof T] ?? undefined);
}
export function enumToStrings(enumValue: object): string[] {
    return Object.keys(enumValue).filter(key => isNaN(Number(key))).map(item => `"${item}"`)
}
export function stringToEnumSingle<T>(enumType: T, value: string): T[keyof T] | undefined {
    return enumType[value as keyof T];
}
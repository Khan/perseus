/**
 * These types were inspired by:
 * - https://stackoverflow.com/questions/56863875/typescript-how-do-you-filter-a-types-properties-to-those-of-a-certain-type
 *   (public domain)
 * - https://github.com/ianstormtaylor/superstruct/blob/e414c8afd3b69f6bc0173b8ee25f71d8e5694f01/src/utils.ts
 *   (MIT license)
 */

export type OptionalizeProperties<T extends object> = Omit<
    T,
    OptionalKeysOf<T>
> &
    Partial<Pick<T, OptionalKeysOf<T>>>;

export type OptionalKeysOf<T extends object> = {
    [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

/**
 * PerseusI18nContext provides a way to set the strings and locale that are
 * used inside the Perseus package.
 *
 */
import * as React from "react";
import {useContext} from "react";

import {mockStrings} from "../strings";

import type {PerseusStrings} from "../strings";

type I18nContextType = {
    strings: PerseusStrings;
    locale: string;
};

const shouldMockStrings: boolean = Boolean(
    process?.env?.NODE_ENV === "test" || process?.env?.STORYBOOK,
);

// @ts-expect-error - TS2322 - Type 'Context<{ strings: {}; locale: string; }>' is not assignable to type 'Context<I18nContextType>'.
export const PerseusI18nContext: React.Context<I18nContextType> =
    React.createContext(
        shouldMockStrings
            ? {
                  strings: mockStrings,
                  locale: "en",
              }
            : // We want to return null here, not an empty object, so that we
              // are will throw an error when attempting to access the
              // undefined locale or strings, making it easier to debug.
              null,
    );

type Props = React.PropsWithChildren<I18nContextType>;

export function PerseusI18nContextProvider({children, strings, locale}: Props) {
    return (
        <PerseusI18nContext.Provider value={{strings, locale}}>
            {children}
        </PerseusI18nContext.Provider>
    );
}

export const usePerseusI18n = () => useContext(PerseusI18nContext);

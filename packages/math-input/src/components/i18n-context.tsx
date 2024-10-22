/**
 * MathInputI18nContext provides a way to set the strings and locale that are
 * used inside the Math Input package.
 *
 */
import * as React from "react";
import {useContext} from "react";

import {mockStrings} from "../strings";

import type {MathInputStrings} from "../strings";

type I18nContextType = {
    strings: MathInputStrings;
    locale: string;
};

// @ts-expect-error - TS2322 - Type 'Context<{ strings: {}; locale: string; }>' is not assignable to type 'Context<I18nContextType>'.
export const MathInputI18nContext: React.Context<I18nContextType> =
    React.createContext(
        typeof process !== "undefined" &&
            (process.env.NODE_ENV === "test" || process.env.STORYBOOK)
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

export function MathInputI18nContextProvider({
    children,
    strings,
    locale,
}: Props) {
    return (
        <MathInputI18nContext.Provider value={{strings, locale}}>
            {children}
        </MathInputI18nContext.Provider>
    );
}

export const useMathInputI18n = () => useContext(MathInputI18nContext);

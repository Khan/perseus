/**
 * PerseusI18nContext provides a way to set the strings and locale that are
 * used inside the Math Input package.
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

// @ts-expect-error - TS2322 - Type 'Context<{ strings: {}; locale: string; }>' is not assignable to type 'Context<I18nContextType>'.
export const PerseusI18nContext: React.Context<I18nContextType> =
    React.createContext({
        strings:
            process.env.NODE_ENV !== "production" || process.env.STORYBOOK
                ? mockStrings
                : {},
        locale: "en",
    });

type Props = React.PropsWithChildren<I18nContextType>;

export function PerseusI18nContextProvider({children, strings, locale}: Props) {
    return (
        <PerseusI18nContext.Provider value={{strings, locale}}>
            {children}
        </PerseusI18nContext.Provider>
    );
}

export const usePerseusI18n = () => useContext(PerseusI18nContext);

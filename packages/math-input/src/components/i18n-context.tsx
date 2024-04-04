/**
 * MathInputI18nContext provides a way to set the strings and locale that are
 * used inside the Math Input package.
 *
 */
import * as React from "react";
import {useContext} from "react";

// eslint-disable-next-line
import {strings} from "../../../../testing/mock-strings";

import type {MathInputStrings} from "../types";

type I18nContextType = {
    strings: MathInputStrings;
    locale: string;
};

// @ts-expect-error - TS2322 - Type 'Context<{ strings: {}; locale: string; }>' is not assignable to type 'Context<I18nContextType>'.
export const I18nContext: React.Context<I18nContextType> = React.createContext({
    strings:
        process.env.NODE_ENV !== "production" || process.env.STORYBOOK
            ? strings
            : {},
    locale: "en",
});

type Props = React.PropsWithChildren<I18nContextType>;

export function I18nContextProvider({children, strings, locale}: Props) {
    return (
        <I18nContext.Provider value={{strings, locale}}>
            {children}
        </I18nContext.Provider>
    );
}

export const useI18n = () => useContext(I18nContext);

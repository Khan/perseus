import {
    KeypadContext,
    MobileKeypad,
    StatefulKeypadContextProvider,
} from "@khanacademy/math-input";
import {Renderer, constants} from "@khanacademy/perseus";
// eslint-disable-next-line monorepo/no-internal-import
import {mockStrings} from "@khanacademy/perseus/strings";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {APIOptions, PerseusRenderer} from "@khanacademy/perseus";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

function ContentRenderer({
    question,
    apiOptions,
    seamless,
    linterContext,
    legacyPerseusLint,
}: {
    question?: PerseusRenderer;
    apiOptions?: APIOptions;
    seamless?: boolean;
    linterContext?: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
}) {
    return (
        <View style={[styles.container, !seamless ? styles.gutter : undefined]}>
            <StatefulKeypadContextProvider>
                <KeypadContext.Consumer>
                    {({setKeypadActive, keypadElement, setKeypadElement}) => (
                        <>
                            <Renderer
                                strings={mockStrings}
                                apiOptions={apiOptions}
                                keypadElement={keypadElement}
                                linterContext={linterContext}
                                legacyPerseusLint={legacyPerseusLint}
                                {...question}
                            />

                            <MobileKeypad
                                onAnalyticsEvent={() => Promise.resolve()}
                                onDismiss={() => setKeypadActive(false)}
                                onElementMounted={setKeypadElement}
                            />
                        </>
                    )}
                </KeypadContext.Consumer>
            </StatefulKeypadContextProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {padding: spacing.xxxSmall_4},
    gutter: {marginRight: constants.lintGutterWidth},
});

export default ContentRenderer;

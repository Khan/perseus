import {
    KeypadContext,
    MobileKeypad,
    StatefulKeypadContextProvider,
} from "@khanacademy/math-input";
import {Renderer} from "@khanacademy/perseus";
// eslint-disable-next-line monorepo/no-internal-import
import {mockStrings} from "@khanacademy/perseus/strings";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import type {APIOptions, PerseusRenderer} from "@khanacademy/perseus";

function ComponentRenderer({
    question,
    apiOptions,
}: {
    question?: PerseusRenderer;
    apiOptions?: APIOptions;
}) {
    return (
        <View style={{marginRight: "40px"}}>
            <StatefulKeypadContextProvider>
                <KeypadContext.Consumer>
                    {({setKeypadActive, keypadElement, setKeypadElement}) => (
                        <>
                <Renderer
                    strings={mockStrings}
                    apiOptions={apiOptions}
                                keypadElement={keypadElement}
                    linterContext={{
                        contentType: "exercise",
                        highlightLint: true,
                        paths: [],
                        stack: [],
                    }}
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

export default ComponentRenderer;

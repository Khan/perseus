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

function ContentPreview({
    question,
    apiOptions,
}: {
    question?: PerseusRenderer;
    apiOptions?: APIOptions;
}) {
    return (
        <View>
            <StatefulKeypadContextProvider>
                <Renderer
                    strings={mockStrings}
                    apiOptions={apiOptions}
                    {...question}
                />
                <KeypadContext.Consumer>
                    {({setKeypadActive, setKeypadElement}) => {
                        return (
                            <MobileKeypad
                                onAnalyticsEvent={() => Promise.resolve()}
                                onDismiss={() => setKeypadActive(false)}
                                onElementMounted={(element) => {
                                    if (element) {
                                        setKeypadElement(element);
                                    }
                                }}
                            />
                        );
                    }}
                </KeypadContext.Consumer>
            </StatefulKeypadContextProvider>
        </View>
    );
}

export default ContentPreview;

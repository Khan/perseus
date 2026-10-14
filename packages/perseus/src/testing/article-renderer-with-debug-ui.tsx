import {KeypadContext} from "@khanacademy/keypad-context";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import ArticleRenderer from "../article-renderer";

import SplitView from "./split-view";
import {StorybookViewOptionsContext} from "./storybook-view-options-context";
import {storybookDependenciesV2} from "./test-dependencies";
import TestKeypadContextWrapper from "./test-keypad-context-wrapper";
import {useStorybookApiOptions} from "./use-storybook-api-options";

import type {APIOptions} from "../types";
import type {PerseusArticle} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type Props = {
    title?: string;
    /**
     * The Perseus Article to render. Under the hood this has been named
     * `json`, but it is the article. Trust me.
     */
    json: PerseusArticle;
    seed?: number;
    apiOptions?: APIOptions;
    linterContext?: LinterContextProps;
};

export const ArticleRendererWithDebugUI = ({
    title = "📜 Article",
    json,
    seed = 0,
    apiOptions = Object.freeze({}),
    linterContext,
}: Props): React.ReactElement => {
    const ref = React.useRef<ArticleRenderer>(null);
    const baseOptions = useStorybookApiOptions(apiOptions);
    const {isMobile: mobileOverride} = React.useContext(
        StorybookViewOptionsContext,
    );

    // The toolbar's "story default" leaves per-story apiOptions in charge so
    // that mobile stories stay mobile.
    const isMobile = mobileOverride ?? apiOptions.isMobile ?? false;

    const options = React.useMemo(
        () => ({
            ...baseOptions,
            isMobile,
            isArticle: true, // Articles should have isArticle flag set for proper behavior
            customKeypad: isMobile, // Use the mobile keypad for mobile
        }),
        [baseOptions, isMobile],
    );

    return (
        <SplitView
            rendererTitle={
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    {title}
                </View>
            }
            renderer={
                <>
                    <TestKeypadContextWrapper>
                        <KeypadContext.Consumer>
                            {({keypadElement}) => {
                                return (
                                    <View
                                        className={
                                            isMobile ? "perseus-mobile" : ""
                                        }
                                    >
                                        <ArticleRenderer
                                            ref={ref}
                                            apiOptions={options}
                                            json={json}
                                            seed={seed}
                                            dependencies={
                                                storybookDependenciesV2
                                            }
                                            keypadElement={keypadElement}
                                            linterContext={linterContext}
                                        />
                                    </View>
                                );
                            }}
                        </KeypadContext.Consumer>
                    </TestKeypadContextWrapper>
                </>
            }
            jsonObject={json}
        />
    );
};

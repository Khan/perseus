import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Switch from "@khanacademy/wonder-blocks-switch";
import deviceMobile from "@phosphor-icons/core/regular/device-mobile.svg";
import * as React from "react";

import {KeypadContext} from "../packages/keypad-context/src/keypad-context";
import ArticleRenderer from "../packages/perseus/src/article-renderer";

import SplitView from "./split-view";
import {storybookDependenciesV2} from "./test-dependencies";
import TestKeypadContextWrapper from "./test-keypad-context-wrapper";

import type {APIOptions} from "../packages/perseus/src/types";
import type {PerseusArticle} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type Props = {
    title?: string;
    /**
     * The Perseus Article to render. Under the hood this has been named
     * `json`, but it is the article. Trust me.
     */
    json: PerseusArticle;
    apiOptions?: APIOptions;
    linterContext?: LinterContextProps;
};

export const ArticleRendererWithDebugUI = ({
    title = "📜 Article",
    json,
    apiOptions = Object.freeze({}),
    linterContext,
}: Props): React.ReactElement => {
    const ref = React.useRef<ArticleRenderer>(null);
    const [isMobile, setIsMobile] = React.useState(
        apiOptions.isMobile ?? false,
    );
    const options = {
        ...apiOptions,
        isMobile,
        isArticle: true, // Articles should have isArticle flag set for proper behavior
        customKeypad: isMobile, // Use the mobile keypad for mobile
    };

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
                    <View style={{marginLeft: "auto"}}>
                        <Switch
                            icon={<PhosphorIcon icon={deviceMobile} />}
                            checked={isMobile}
                            onChange={setIsMobile}
                        />
                    </View>
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

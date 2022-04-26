// @flow
/* eslint-disable static-service/require-fixture */
import * as React from "react";
import ReactJson from "react-json-view";
import {View, RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {TestTeX} from "./test-tex.jsx";

import {Dependencies, Renderer} from "../perseus-all-package/perseus.js";
import {testDependencies} from "./test-dependencies.js";

import {registerAllWidgetsForTesting} from "../perseus-all-package/util/register-all-widgets-for-testing.js";
import SideBySide from "./side-by-side.jsx";

import type {APIOptions} from "../perseus-all-package/types.js";
import type {PerseusRenderer} from "../perseus-all-package/perseus-types.js";

type Props = {|
    question: PerseusRenderer,
    apiOptions?: APIOptions,
    reviewMode?: boolean,
|};

export const RendererWithDebugUI = ({
    question,
    apiOptions,
    reviewMode = false,
}: Props): React.Node => {
    registerAllWidgetsForTesting();
    const ref = React.useRef<?Renderer>(null);
    const [state, setState] = React.useState(null);
    Dependencies.setDependencies({
        ...testDependencies,
        TeX: TestTeX,
    });

    return (
        <SideBySide
            leftTitle="Widget"
            left={
                <>
                    <RenderStateRoot>
                        <Renderer
                            ref={ref}
                            content={question.content}
                            images={question.images}
                            widgets={question.widgets}
                            problemNum={0}
                            apiOptions={apiOptions}
                            reviewMode={reviewMode}
                        />
                    </RenderStateRoot>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Button
                            onClick={() => {
                                if (!ref.current) {
                                    return;
                                }
                                setState(ref.current.guessAndScore());
                            }}
                        >
                            Check
                        </Button>
                        <Strut size={8} />
                        <Button
                            onClick={() => {
                                ref.current?.showRationalesForCurrentlySelectedChoices();
                            }}
                        >
                            Show Rationales
                        </Button>
                    </View>
                    {state != null && (
                        <>
                            <HeadingSmall style={{marginTop: "10px"}}>
                                Guess
                            </HeadingSmall>
                            <ReactJson
                                quotesOnKeys={false}
                                enableClipboard={false}
                                src={state[0]}
                            />
                            <HeadingSmall style={{marginTop: "10px"}}>
                                Score
                            </HeadingSmall>
                            <ReactJson
                                quotesOnKeys={false}
                                enableClipboard={false}
                                src={state[1]}
                            />
                        </>
                    )}
                </>
            }
            perseusObject={question}
        />
    );
};

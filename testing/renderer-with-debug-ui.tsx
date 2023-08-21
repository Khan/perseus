/* eslint-disable @khanacademy/ts-no-error-suppressions */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactJson from "react-json-view";

import {Renderer} from "../packages/perseus/src/index";
import {registerAllWidgetsForTesting} from "../packages/perseus/src/util/register-all-widgets-for-testing";

import SideBySide from "./side-by-side";

import type {PerseusRenderer} from "../packages/perseus/src/perseus-types";
import type {APIOptions} from "../packages/perseus/src/types";

type Props = {
    question: PerseusRenderer;
    apiOptions?: APIOptions;
    reviewMode?: boolean;
};

export const RendererWithDebugUI = ({
    question,
    apiOptions,
    reviewMode = false,
}: Props): React.ReactElement => {
    registerAllWidgetsForTesting();
    const ref = React.useRef<Renderer | null | undefined>(null);
    const [state, setState] = React.useState<any>(null);

    return (
        <SideBySide
            leftTitle="Widget"
            left={
                <>
                    <Renderer
                        // @ts-expect-error - TS2322 - Type 'MutableRefObject<Renderer | null | undefined>' is not assignable to type 'LegacyRef<Renderer> | undefined'.
                        ref={ref}
                        content={question.content}
                        images={question.images}
                        widgets={question.widgets}
                        problemNum={0}
                        apiOptions={apiOptions}
                        reviewMode={reviewMode}
                    />
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
            jsonObject={question}
        />
    );
};

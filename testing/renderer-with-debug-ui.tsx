/* eslint-disable @khanacademy/ts-no-error-suppressions */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Switch from "@khanacademy/wonder-blocks-switch";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import deviceMobile from "@phosphor-icons/core/regular/device-mobile.svg";
import * as React from "react";
import ReactJson from "react-json-view";

import {Renderer, usePerseusI18n} from "../packages/perseus/src/index";
import {scorePerseusItem} from "../packages/perseus/src/renderer-util";
import {mockStrings} from "../packages/perseus/src/strings";
import {registerAllWidgetsForTesting} from "../packages/perseus/src/util/register-all-widgets-for-testing";

import SideBySide from "./side-by-side";

import type {PerseusRenderer} from "../packages/perseus/src/perseus-types";
import type {ComponentProps} from "react";

type Props = {
    question: PerseusRenderer;
} & Partial<
    Omit<
        ComponentProps<typeof Renderer>,
        "content" | "images" | "widgets" | "problemNum"
    >
>;

export const RendererWithDebugUI = ({
    question,
    apiOptions,
    reviewMode = false,
    ...rest
}: Props): React.ReactElement => {
    registerAllWidgetsForTesting();
    const ref = React.useRef<Renderer | null | undefined>(null);
    const [state, setState] = React.useState<any>(null);
    const [isMobile, setIsMobile] = React.useState(false);
    const {strings} = usePerseusI18n();

    return (
        <SideBySide
            leftTitle={
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    Widget
                    <View style={{marginLeft: "auto"}}>
                        <Switch
                            icon={<PhosphorIcon icon={deviceMobile} />}
                            checked={isMobile}
                            onChange={setIsMobile}
                        />
                    </View>
                </View>
            }
            left={
                <View>
                    <View className={isMobile ? "perseus-mobile" : ""}>
                        <Renderer
                            // @ts-expect-error - TS2322 - Type 'MutableRefObject<Renderer | null | undefined>' is not assignable to type 'LegacyRef<Renderer> | undefined'.
                            ref={ref}
                            content={question.content}
                            images={question.images}
                            widgets={question.widgets}
                            problemNum={0}
                            apiOptions={{...apiOptions, isMobile}}
                            reviewMode={reviewMode}
                            strings={strings}
                            {...rest}
                        />
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Button
                            onClick={() => {
                                if (!ref.current) {
                                    return;
                                }
                                const guess = ref.current.getUserInputMap();
                                const score = scorePerseusItem(
                                    question,
                                    ref.current.getUserInputMap(),
                                    mockStrings,
                                    "en",
                                );
                                setState([guess, score]);
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
                </View>
            }
            jsonObject={question}
        />
    );
};

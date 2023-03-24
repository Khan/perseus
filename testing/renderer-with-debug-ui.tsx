import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactJson from "react-json-view";

import {Renderer} from '../packages/perseus/src/index';
import {registerAllWidgetsForTesting} from '../packages/perseus/src/util/register-all-widgets-for-testing';

import SideBySide from './side-by-side';

import type {PerseusRenderer} from '../packages/perseus/src/perseus-types';
import type {APIOptions} from '../packages/perseus/src/types';

type Props = {
    question: PerseusRenderer,
    apiOptions?: APIOptions,
    reviewMode?: boolean
};

export const RendererWithDebugUI: React.FC<Props> = (
    {
        question,
        apiOptions,
        reviewMode = false,
    },
): React.ReactElement => {
    registerAllWidgetsForTesting();
    const ref = React.useRef<Renderer | null | undefined>(null);
    const [state, setState] = React.useState<any>(null);

    return (
        <SideBySide
            leftTitle="Widget"
            left={
                <>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'Renderer' cannot be used as a JSX component. */}
                    <Renderer
// @ts-expect-error [FEI-5003] - TS2322 - Type 'MutableRefObject<Renderer | null | undefined>' is not assignable to type 'LegacyRef<Renderer> | undefined'.
                        ref={ref}
                        content={question.content}
                        images={question.images}
                        widgets={question.widgets}
                        problemNum={0}
                        apiOptions={apiOptions}
                        reviewMode={reviewMode}
                    />
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'View' cannot be used as a JSX component. */}
                    <View style={{flexDirection: "row", alignItems: "center"}}>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'Button' cannot be used as a JSX component. */}
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
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'Strut' cannot be used as a JSX component. */}
                        <Strut size={8} />
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'Button' cannot be used as a JSX component. */}
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
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'HeadingSmall' cannot be used as a JSX component. */}
                            <HeadingSmall style={{marginTop: "10px"}}>
                                Guess
                            </HeadingSmall>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'ReactJson' cannot be used as a JSX component. */}
                            <ReactJson
                                quotesOnKeys={false}
                                enableClipboard={false}
                                src={state[0]}
                            />
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'HeadingSmall' cannot be used as a JSX component. */}
                            <HeadingSmall style={{marginTop: "10px"}}>
                                Score
                            </HeadingSmall>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'ReactJson' cannot be used as a JSX component. */}
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

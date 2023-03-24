import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import * as React from "react";

import {ItemRenderer} from '../packages/perseus/src/index';

import KEScoreUI from './ke-score-ui';
import SideBySide from './side-by-side';

import type {PerseusItem} from '../packages/perseus/src/perseus-types';
import type {APIOptions, KEScore} from '../packages/perseus/src/types';

type Props = {
    item: PerseusItem,
    apiOptions?: APIOptions
};

export const ItemRendererWithDebugUI: React.FC<Props> = (
    {
        item,
        apiOptions,
    },
): React.ReactElement => {
    const ref = React.useRef<ItemRenderer | null | undefined>(null);
    const [state, setState] = React.useState<KEScore | null | undefined>(null);

    return (
        <SideBySide
            leftTitle="Renderer"
            left={
                <>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'ItemRenderer' cannot be used as a JSX component. */}
                    <ItemRenderer
// @ts-expect-error [FEI-5003] - TS2322 - Type 'MutableRefObject<ItemRenderer | null | undefined>' is not assignable to type 'LegacyRef<ItemRenderer> | undefined'.
                        ref={ref}
                        problemNum={0}
                        apiOptions={apiOptions}
                        item={item}
                        savedState={null}
                    />
                    <div id="workarea" />
                    <div id="hintsarea" />
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'View' cannot be used as a JSX component. */}
                    <View style={{flexDirection: "row", alignItems: "center"}}>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'Button' cannot be used as a JSX component. */}
                        <Button
                            onClick={() => {
                                if (!ref.current) {
                                    return;
                                }
                                setState(ref.current.scoreInput());
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
                    <KEScoreUI score={state} />
                </>
            }
            perseusObject={item}
        />
    );
};

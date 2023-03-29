import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import * as React from "react";

import * as Perseus from '../packages/perseus/src/index';

import KEScoreUI from './ke-score-ui';
import SideBySide from './side-by-side';

import type {PerseusItem} from '../packages/perseus/src/perseus-types';
import type {APIOptions, KEScore} from '../packages/perseus/src/types';
import type {AbstractComponent} from "react";

// Jump through the Flow hoops to get at the underlying type that our ref will
// point to.
type ExtractComponentType = <P, T>(arg1: AbstractComponent<P, T>) => T;
type ServerItemRendererType = ReturnType<ExtractComponentType>;

type Props = {
    item: PerseusItem,
    apiOptions?: APIOptions
};

export const ServerItemRendererWithDebugUI: React.FC<Props> = (
    {
        item,
        apiOptions,
    },
): React.ReactElement => {
    const ref = React.useRef<ServerItemRendererType | null | undefined>(null);
    const [state, setState] = React.useState<KEScore | null | undefined>(null);
    const options = apiOptions || Object.freeze({});

    return (
        <SideBySide
            leftTitle="Renderer"
            left={
                <>
                    <Perseus.ServerItemRenderer
                        ref={ref}
                        problemNum={0}
                        apiOptions={options}
                        item={item}
                    />
                    <View style={{flexDirection: "row", alignItems: "center"}}>
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
                        <Strut size={8} />
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

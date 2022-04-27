// @flow

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import * as React from "react";

import * as Perseus from "../packages/perseus/src/index.js";

import KEScoreUI from "./ke-score-ui.js";
import SideBySide from "./side-by-side.jsx";

import type {PerseusItem} from "../packages/perseus/src/perseus-types.js";
import type {APIOptions, KEScore} from "../packages/perseus/src/types.js";
import type {AbstractComponent} from "react";

// Jump through the Flow hoops to get at the underlying type that our ref will
// point to.
type ExtractComponentType = <P, T>(AbstractComponent<P, T>) => T;
type ServerItemRendererType = $Call<
    ExtractComponentType,
    typeof Perseus.ServerItemRenderer,
>;

type Props = {|
    item: PerseusItem,
    apiOptions?: APIOptions,
|};

export const ServerItemRendererWithDebugUI = ({
    item,
    apiOptions,
}: Props): React.Node => {
    const ref = React.useRef<?ServerItemRendererType>(null);
    const [state, setState] = React.useState<?KEScore>(null);
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

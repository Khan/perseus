// @flow

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import * as React from "react";

import {Dependencies, ItemRenderer} from "../packages/perseus/src/index.js";

import KEScoreUI from "./ke-score-ui.js";
import SideBySide from "./side-by-side.jsx";
import {testDependencies} from "./test-dependencies.js";

import type {PerseusItem} from "../packages/perseus/src/perseus-types.js";
import type {APIOptions, KEScore} from "../packages/perseus/src/types.js";

type Props = {|
    item: PerseusItem,
    apiOptions?: APIOptions,
|};

export const ItemRendererWithDebugUI = ({
    item,
    apiOptions,
}: Props): React.Node => {
    const ref = React.useRef<?ItemRenderer>(null);
    const [state, setState] = React.useState<?KEScore>(null);

    Dependencies.setDependencies(testDependencies);

    return (
        <SideBySide
            leftTitle="Renderer"
            left={
                <>
                    <ItemRenderer
                        ref={ref}
                        problemNum={0}
                        apiOptions={apiOptions}
                        item={item}
                        savedState={null}
                    />
                    <div id="workarea" />
                    <div id="hintsarea" />
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

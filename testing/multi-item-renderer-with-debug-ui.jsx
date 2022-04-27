// @flow

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {Dependencies, MultiItems} from "../packages/perseus/src/index.js";
import {simpleQuestionShape} from "../packages/perseus/src/multi-items/__testdata__/multi-renderer_testdata.js";

import KEScoreUI from "./ke-score-ui.js";
import SideBySide from "./side-by-side.jsx";
import {testDependencies} from "./test-dependencies.js";

import type {Item as MultiItem} from "../packages/perseus/src/multi-items/item-types.js";
import type {APIOptions, KEScore} from "../packages/perseus/src/types.js";

type SimpleItemRenderTree = {|
    blurb: React.Node,
    question: React.Node,
    hints: $ReadOnlyArray<React.Node>,
|};

type Props = {|
    simpleItem: MultiItem,
    children: (tree: {|renderers: SimpleItemRenderTree|}) => React.Element<any>,
    apiOptions?: APIOptions,
|};

// Renders an assessment item (aka {_multi: ...} that conforms to the
// sample data simpleQuestionShape.
export const MultiItemRendererWithDebugUI = ({
    children,
    simpleItem,
    apiOptions,
}: Props): React.Node => {
    const ref = React.useRef<?MultiItems.MultiRenderer>(null);
    const [state, setState] = React.useState<?KEScore>(null);

    Dependencies.setDependencies(testDependencies);

    return (
        <SideBySide
            leftTitle="Multi Renderer"
            left={
                <>
                    <MultiItems.MultiRenderer
                        item={simpleItem}
                        shape={simpleQuestionShape}
                        ref={ref}
                    >
                        {(renderers) => {
                            // $FlowFixMe[incompatible-call]
                            // $FlowFixMe[incompatible-indexer]
                            // $FlowFixMe[prop-missing]
                            return children(renderers);
                        }}
                    </MultiItems.MultiRenderer>
                    <div id="workarea" />
                    <div id="hintsarea" />
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Button
                            onClick={() => {
                                if (!ref.current) {
                                    return;
                                }
                                setState(ref.current.score());
                            }}
                        >
                            Check
                        </Button>
                    </View>
                    <KEScoreUI score={state} />
                </>
            }
            perseusObject={simpleItem}
        />
    );
};

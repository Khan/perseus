// @flow
/* eslint-disable static-service/require-fixture */

import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import {webappDependencies} from "../perseus/webapp-dependencies.js";
import {Dependencies, MultiItems} from "../perseus-all-package/perseus.js";
import SideBySide from "./side-by-side.jsx";
import KEScoreUI from "./ke-score-ui.js";
import {simpleQuestionShape} from "../perseus-all-package/multi-items/__testdata__/multi-renderer_testdata.js";

import type {Item as MultiItem} from "../perseus-all-package/multi-items/item-types.js";
import type {APIOptions, KEScore} from "../perseus-all-package/types.js";

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

    Dependencies.setDependencies(webappDependencies);

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

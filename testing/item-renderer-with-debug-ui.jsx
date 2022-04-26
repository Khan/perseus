// @flow
/* eslint-disable static-service/require-fixture */

import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";

import {webappDependencies} from "../perseus/webapp-dependencies.js";
import {Dependencies, ItemRenderer} from "../perseus-all-package/perseus.js";
import SideBySide from "./side-by-side.jsx";
import KEScoreUI from "./ke-score-ui.js";

import type {PerseusItem} from "../perseus-all-package/perseus-types.js";
import type {APIOptions, KEScore} from "../perseus-all-package/types.js";

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

    Dependencies.setDependencies(webappDependencies);

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

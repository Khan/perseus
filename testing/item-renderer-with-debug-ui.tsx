import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import * as React from "react";

import {useDependencies} from "../packages/perseus/src/dependencies";
import {ItemRenderer} from "../packages/perseus/src/index";

import KEScoreUI from "./ke-score-ui";
import SideBySide from "./side-by-side";

import type {PerseusItem} from "../packages/perseus/src/perseus-types";
import type {APIOptions, KEScore} from "../packages/perseus/src/types";

type Props = {
    item: PerseusItem;
    apiOptions?: APIOptions;
};

export const ItemRendererWithDebugUI = ({
    item,
    apiOptions,
}: Props): React.ReactElement => {
    const ref = React.useRef<ItemRenderer | null | undefined>(null);
    const [state, setState] = React.useState<KEScore | null | undefined>(null);

    // We provide the dependencies in `.storybook/preview.js` so we can just
    // pipe it through here. If this component is used outside of Storybook,
    // the caller will need to provide the dependencies through the
    // DependenciesContext.Provider.
    const deps = useDependencies();

    return (
        <SideBySide
            leftTitle="Renderer"
            left={
                <>
                    <ItemRenderer
                        // @ts-expect-error [FEI-5003] - TS2322 - Type 'MutableRefObject<ItemRenderer | null | undefined>' is not assignable to type 'LegacyRef<ItemRenderer> | undefined'.
                        ref={ref}
                        problemNum={0}
                        apiOptions={apiOptions}
                        item={item}
                        savedState={null}
                        dependencies={deps}
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
            jsonObject={item}
        />
    );
};

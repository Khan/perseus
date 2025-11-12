import * as React from "react";

import ExtrasPage from "../keypad-pages/extras-page";
import FractionsPage from "../keypad-pages/fractions-page";
import GeometryPage from "../keypad-pages/geometry-page";
import NumbersPage from "../keypad-pages/numbers-page";
import OperatorsPage from "../keypad-pages/operators-page";
import {RenderKeyPadPanel} from "../render-keypad-panel";
import TabIconLabel from "../tab-icon-label";

import type {KeypadPageType} from "../../../types";
import type {KeypadProps} from "../keypad";
import type {TabItem} from "@khanacademy/wonder-blocks-tabs";

export function getAvailableTabs(
    props: KeypadProps,
    selectedPage: KeypadPageType,
): Array<TabItem> {
    const {
        onClickKey,
        cursorContext,
        preAlgebra,
        logarithms,
        basicRelations,
        advancedRelations,
        scientific,
        extraKeys,
    } = props;

    // TODO: update IconAsset to not use tintColor
    const tabPanels = [
        {
            id: "Fractions",
            label: <TabIconLabel type="Fractions" tintColor="currentColor" />,
            panel: (
                <RenderKeyPadPanel {...props} selectedPage={selectedPage}>
                    <FractionsPage
                        onClickKey={onClickKey}
                        cursorContext={cursorContext}
                    />
                </RenderKeyPadPanel>
            ),
        },
        {
            id: "Numbers",
            label: <TabIconLabel type="Numbers" tintColor="currentColor" />,
            panel: (
                <RenderKeyPadPanel {...props} selectedPage={selectedPage}>
                    <NumbersPage
                        onClickKey={onClickKey}
                        scientific={scientific}
                    />
                </RenderKeyPadPanel>
            ),
        },
        {
            id: "Extras",
            label: <TabIconLabel type="Extras" tintColor="currentColor" />,
            panel: (
                <RenderKeyPadPanel {...props} selectedPage={selectedPage}>
                    <ExtrasPage
                        onClickKey={onClickKey}
                        extraKeys={extraKeys ?? []}
                    />
                </RenderKeyPadPanel>
            ),
        },
        {
            id: "Operators",
            label: <TabIconLabel type="Operators" tintColor="currentColor" />,
            panel: (
                <RenderKeyPadPanel {...props} selectedPage={selectedPage}>
                    <OperatorsPage
                        onClickKey={onClickKey}
                        preAlgebra={preAlgebra}
                        logarithms={logarithms}
                        basicRelations={basicRelations}
                        advancedRelations={advancedRelations}
                    />
                </RenderKeyPadPanel>
            ),
        },
        {
            id: "Geometry",
            label: <TabIconLabel type="Geometry" tintColor="currentColor" />,
            panel: (
                <RenderKeyPadPanel {...props} selectedPage={selectedPage}>
                    <GeometryPage onClickKey={onClickKey} />
                </RenderKeyPadPanel>
            ),
        },
    ];

    const tabIds: Array<KeypadPageType> = ["Numbers"];
    if (
        props.preAlgebra ||
        props.logarithms ||
        props.basicRelations ||
        props.advancedRelations
    ) {
        tabIds.push("Operators");
    }
    if (props.trigonometry) {
        tabIds.push("Geometry");
    }
    if (props.extraKeys?.length) {
        tabIds.push("Extras");
    }
    if (props?.showDismiss) {
        tabIds.push("Dismiss");
    }

    return tabPanels.filter((tab) => tabIds.includes(tab.id as KeypadPageType));
}

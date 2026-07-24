import * as React from "react";
import {action} from "storybook/actions";
import {INITIAL_VIEWPORTS} from "storybook/viewport";

import TintedBackgroundDecorator from "../../../__docs__/tinted-background-decorator";
import {RenderKeyPadPanel} from "../render-keypad-panel";

import GeometryInputPage from "./geometry-page";
import NumbersPage from "./numbers-page";
import OperatorsPage from "./operators-page";

import type {Meta} from "@storybook/react-vite";

export default {
    title: "Math Input/Components/Keypad pages",
    tags: ["!dev"],
    decorators: [TintedBackgroundDecorator],
    parameters: {
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
    },
} satisfies Meta;

export const NumbersPageLayout = (): React.ReactElement => (
    <RenderKeyPadPanel selectedPage="Numbers" onClickKey={() => {}}>
        <NumbersPage onClickKey={action("onClickKey")} />
    </RenderKeyPadPanel>
);

export const OperatorsPageLayout = (): React.ReactElement => (
    <RenderKeyPadPanel selectedPage="Operators" onClickKey={() => {}}>
        <OperatorsPage
            onClickKey={action("onClickKey")}
            preAlgebra={true}
            logarithms={true}
            basicRelations={true}
            advancedRelations={true}
        />
    </RenderKeyPadPanel>
);

export const OperatorsPageOnlyPreAlgebra = (): React.ReactElement => (
    <RenderKeyPadPanel selectedPage="Operators" onClickKey={() => {}}>
        <OperatorsPage
            onClickKey={action("onClickKey")}
            preAlgebra={true}
            logarithms={false}
            basicRelations={false}
            advancedRelations={false}
        />
    </RenderKeyPadPanel>
);

export const OperatorsPageOnlyLogarithms = (): React.ReactElement => (
    <RenderKeyPadPanel selectedPage="Operators" onClickKey={() => {}}>
        <OperatorsPage
            onClickKey={action("onClickKey")}
            preAlgebra={false}
            logarithms={true}
            basicRelations={false}
            advancedRelations={false}
        />
    </RenderKeyPadPanel>
);

export const OperatorsPageOnlyBasicRelations = (): React.ReactElement => (
    <RenderKeyPadPanel selectedPage="Operators" onClickKey={() => {}}>
        <OperatorsPage
            onClickKey={action("onClickKey")}
            preAlgebra={false}
            logarithms={false}
            basicRelations={true}
            advancedRelations={false}
        />
    </RenderKeyPadPanel>
);

export const OperatorsPageOnlyAdvancedRelations = (): React.ReactElement => (
    <RenderKeyPadPanel selectedPage="Operators" onClickKey={() => {}}>
        <OperatorsPage
            onClickKey={action("onClickKey")}
            preAlgebra={false}
            logarithms={false}
            basicRelations={false}
            advancedRelations={true}
        />
    </RenderKeyPadPanel>
);

export const GeometryInputPageLayout = (): React.ReactElement => (
    <RenderKeyPadPanel selectedPage="Extras" onClickKey={() => {}}>
        <GeometryInputPage onClickKey={action("onClickKey")} />
    </RenderKeyPadPanel>
);

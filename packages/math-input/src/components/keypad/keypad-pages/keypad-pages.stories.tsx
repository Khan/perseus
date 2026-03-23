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

export const NumericInput = (): React.ReactElement => (
    <RenderKeyPadPanel selectedPage="Numbers" onClickKey={() => {}}>
        <NumbersPage onClickKey={action("onClickKey")} />
    </RenderKeyPadPanel>
);

export const PreAlgebraInput = (): React.ReactElement => (
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

export const TrigonometryInput = (): React.ReactElement => (
    <RenderKeyPadPanel selectedPage="Extras" onClickKey={() => {}}>
        <GeometryInputPage onClickKey={action("onClickKey")} />
    </RenderKeyPadPanel>
);

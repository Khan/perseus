import {action} from "@storybook/addon-actions";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";
import * as React from "react";

import {strings} from "../../../../../../testing/mock-strings";

import GeometryInputPage from "./geometry-page";
import NumbersPage from "./numbers-page";
import PrealgebraInputPage from "./operators-page";

export default {
    title: "math-input/components/Keypad pages",
    parameters: {
        backgrounds: {
            values: [{name: "light background", value: "white", default: true}],
        },
        viewport: {defaultViewport: "iphone6", viewports: INITIAL_VIEWPORTS},
    },
};

export const NumericInput = ({
    locale,
}: {
    locale: string;
}): React.ReactElement => (
    <NumbersPage
        strings={strings}
        locale={locale}
        onClickKey={action("onClickKey")}
    />
);

export const PreAlgebraInput = ({
    locale,
}: {
    locale: string;
}): React.ReactElement => (
    <PrealgebraInputPage
        strings={strings}
        locale={locale}
        onClickKey={action("onClickKey")}
        preAlgebra={true}
        logarithms={true}
        basicRelations={true}
        advancedRelations={true}
    />
);

export const TrigonometryInput = ({
    locale,
}: {
    locale: string;
}): React.ReactElement => (
    <GeometryInputPage
        strings={strings}
        locale={locale}
        onClickKey={action("onClickKey")}
    />
);

import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import type {Decorator} from "@storybook/react-vite";

const TintedBackgroundDecorator: Decorator = (Story) => (
    <View
        style={{backgroundColor: semanticColor.core.background.disabled.strong}}
    >
        <Story />
    </View>
);

export default TintedBackgroundDecorator;

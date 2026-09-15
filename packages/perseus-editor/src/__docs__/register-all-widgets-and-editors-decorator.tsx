import * as React from "react";

import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import type {Decorator} from "@storybook/react-vite";

export const registerAllWidgetsAndEditorsDecorator: Decorator = (Story) => {
    registerAllWidgetsAndEditorsForTesting();

    return <Story />;
};

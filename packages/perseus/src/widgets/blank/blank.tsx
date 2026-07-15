/**
 *  A widget that creates blank dropzones for "Drag And Drop" widgets to drop answer tiles into.
 */

import * as React from "react";

import type {PerseusBlankWidgetOptions} from "@khanacademy/perseus-core";
import type {
    PerseusScore,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../types";

type RenderProps = PerseusMyNewWidgetWidgetOptions;
type Props = WidgetProps<RenderProps, PerseusMyNewWidgetWidgetOptions>;

/**
 * Define the type of the user input your widget accepts. This is
 * set to null to represent that there is no expected user input.
 */
type UserInput = null;
type Rubric = PerseusMyNewWidgetWidgetOptions;

export class MyNewWidget extends React.Component<Props> implements Widget {

    getUserInput(): UserInput {
        return null;
    }

    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    simpleValidate: (arg1: any) => any = (rubric) => {
        return MyNewWidget.validate(this.getUserInput(), rubric);
    };

    render(): React.ReactNode {
        return (
          // Add your HTML here
        );
    }
}

export default {
    name: "my-new-widget",
    displayName: "My New Widget",
    widget: MyNewWidget,
    // Hides widget from content creators until full release
    hidden: true,
    // Add any other option transforms you need
} as WidgetExports<typeof MyNewWidget>;
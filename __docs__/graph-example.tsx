import * as React from "react";

import {ServerItemRenderer} from "@khanacademy/perseus";

import {registerWidgets} from "../packages/perseus/src/widgets";
import {interactiveGraphRegistration} from "../packages/perseus/src/widgets/interactive-graphs";

import {graphExample} from "./sample-data";

// Meta decorators only wrap stories, and the Introduction page renders this
// item inline, so the example registers its widget itself.
export function GraphExample(): React.ReactElement {
    registerWidgets([interactiveGraphRegistration]);

    return <ServerItemRenderer {...graphExample} />;
}

import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import * as React from "react";
import {useState} from "react";

import {getDependencies} from "../dependencies";

type Props = {
    children: () => React.ReactElement;
};

// To minimize layout shift, we sometimes want to display a spinner until
// our math renderer is ready to render math. To do this, we:
// - render a dummy TeX component to force the math renderer to load
// - display a spinner until the TeX component calls its onRender
//   callback, signifying that the math is rendered (from which we can
//   infer that the math renderer has loaded, and is ready to render the
//   actual math on the page).
//
// If we didn't do this, the user might see a blank widget on first render,
// and then the math would pop in a few moments later once the rendering
// library loaded.
export function SpinnerUntilTexCanRender({
    children,
}: Props): React.ReactElement {
    const [dummyTexRendered, setDummyTexRendered] = useState(false);

    if (!dummyTexRendered) {
        const {TeX} = getDependencies();
        const dummyTex = (
            <div style={{display: "none"}}>
                <TeX onRender={() => setDummyTexRendered(true)}>1</TeX>
            </div>
        );
        return (
            <>
                <CircularSpinner />
                {dummyTex}
            </>
        );
    }

    return children();
}

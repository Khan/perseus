// @flow
/**
 * Fixture data for Iframe Widget.
 *
 * Viewable in the React Sandbox:
 * http://localhost:8080/react-sandbox/perseus-all-package/widgets/iframe.jsx.fixture.js
 */
import {getFixtureFnFor} from "../../testing/sandbox/fixture.js";

import IframeWidget from "./iframe.jsx";

const Iframe = IframeWidget.widget;

const fixture = getFixtureFnFor(Iframe);
export const instances: $ReadOnlyArray<mixed> = [
    fixture("Iframe with no units on width/height", {
        url: "4772835774169088",
        settings: [{name: "step", value: "1"}],
        width: "400",
        height: "400",
        onChange: () => {},
    }),
    fixture("Iframe with units on width/height", {
        url: "4772835774169088",
        settings: [{name: "step", value: "1"}],
        width: "400px",
        height: "400px",
        onChange: () => {},
    }),
    // This will throw an error, but it will still render
    fixture("Iframe with number props", {
        url: "4772835774169088",
        settings: [{name: "step", value: "1"}],
        width: 400,
        height: 400,
        onChange: () => {},
    }),
];

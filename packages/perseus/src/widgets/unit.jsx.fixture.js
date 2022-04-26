// @flow
/* eslint-disable no-console */
import {getFixtureFnFor} from "../../testing/sandbox/fixture.js";
import {ApiOptions} from "../perseus-api.jsx";

import unitWidget from "./unit.jsx";

const fixture = getFixtureFnFor(unitWidget.widget);

export const instances: $ReadOnlyArray<mixed> = [
    fixture("staticRender", {
        apiOptions: {
            ...ApiOptions.defaults,
            staticRender: true,
        },
        value: "2 tbsp",
        onFocus: () => console.log("focus"),
        onBlur: () => console.log("blur"),
        onChange: ({value}) => {
            if (value !== undefined) {
                console.log(`value = ${value}`);
            }
        },
    }),
    fixture("non-staticRender", {
        apiOptions: {
            ...ApiOptions.defaults,
            staticRender: false,
        },
        value: "2 tbsp",
        onFocus: () => console.log("focus"),
        onBlur: () => console.log("blur"),
        onChange: ({value}) => {
            if (value !== undefined) {
                console.log(`value = ${value}`);
            }
        },
    }),
];

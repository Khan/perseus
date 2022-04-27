// @flow
import type {PerseusRenderer} from "../../perseus-types.js";

export default {
    question: ({
        content:
            "![domokun](http://data.whicdn.com/images/7485807/large.jpg)\n",
        images: {
            "http://data.whicdn.com/images/7485807/large.jpg": {
                width: 500,
                height: 333,
            },
        },
        widgets: {},
    }: PerseusRenderer),
    answerArea: {
        calculator: false,
        periodicTable: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: ([]: $ReadOnlyArray<any>),
};

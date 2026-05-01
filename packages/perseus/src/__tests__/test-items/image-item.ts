import type {PerseusRenderer} from "@khanacademy/perseus-core";

export default {
    // eslint-disable-next-line no-restricted-syntax
    question: {
        content:
            "![domokun](http://data.whicdn.com/images/7485807/large.jpg)\n",
        images: {
            "http://data.whicdn.com/images/7485807/large.jpg": {
                width: 500,
                height: 333,
            },
        },
        widgets: {},
    } as PerseusRenderer,
    answerArea: {
        calculator: false,
        periodicTable: false,
    },
    // eslint-disable-next-line no-restricted-syntax
    hints: [] as ReadonlyArray<any>,
};

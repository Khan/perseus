import {ItemExtras, type PerseusAnswerArea} from "../data-schema";

export default function getDefaultAnswerArea(): PerseusAnswerArea {
    // eslint-disable-next-line no-restricted-syntax
    return ItemExtras.reduce(
        (acc, curr) => ({...acc, [curr]: false}),
        {},
    ) as PerseusAnswerArea;
}

import {ItemExtras, type PerseusAnswerArea} from "../data-schema";

export default function getDefaultAnswerArea(): PerseusAnswerArea {
    return ItemExtras.reduce(
        (acc, curr) => ({...acc, [curr]: false}),
        {},
    ) as PerseusAnswerArea;
}

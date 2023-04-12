import {BorderDirections, EchoAnimationTypes} from "./consts";

import type {Key} from "./data/keys";

export type Border = Partial<Array<keyof typeof BorderDirections>>;

export type Popover = {
    parentId: Key;
    bounds: DOMRect;
    childKeyIds: Array<Key>;
};

export type Echo = {
    animationId: string;
    animationType: keyof typeof EchoAnimationTypes;
    borders: Border;
    id: Key;
    initialBounds: DOMRect;
};

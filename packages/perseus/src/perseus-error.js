// @flow

import type {ErrorKind} from "./logging/log.js";
import type {Metadata} from "@khanacademy/wonder-stuff-core";

type Options = {|
    metadata?: ?Metadata,
|};

export class PerseusError extends Error {
    kind: ErrorKind;
    metadata: ?Metadata;

    constructor(message: string, kind: ErrorKind, options?: Options) {
        super(message);
        this.kind = kind;
        this.metadata = options?.metadata;
    }
}

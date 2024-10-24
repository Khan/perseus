import type {Metadata} from "@khanacademy/wonder-stuff-core";
import type {ErrorKind} from "./errors";

type Options = {
    metadata?: Metadata | null | undefined;
};

export class PerseusError extends Error {
    kind: ErrorKind;
    metadata: Metadata | null | undefined;

    constructor(message: string, kind: ErrorKind, options?: Options) {
        super(message);
        this.kind = kind;
        this.metadata = options?.metadata;
    }
}

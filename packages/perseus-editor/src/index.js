// @flow
import {foo} from "@khanacademy/perseus";

// eslint-disable-next-line no-console
export const bar = (): void => console.log(`foo() = ${foo()}`);

export const sum = (...args: Array<number>): number =>
    args.reduce((a, b) => a + b, 0);

// @flow
import {foo} from "@khanacademy/perseus";
import * as i18n from "@khanacademy/wonder-blocks-i18n";

export const bar = (): void => {
    const msg = i18n._("foo() = %(foo)s", {foo: foo()});
    // eslint-disable-next-line no-console
    console.log(msg);
};

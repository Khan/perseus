import * as i18n from "@khanacademy/wonder-blocks-i18n";

import type {MathQuillAriaStatisStringsMap} from "./mathquill-types";

export const mathQuillStrings = {
    mathInputBox: i18n._("Math input box"),
    ariaStaticStringsMap: {
        before: (obj) => i18n._("before %(obj)s", {obj}),
        after: (obj) => i18n._("after %(obj)s", {obj}),
        "beginning of": (obj) => i18n._("beginning of %(obj)s", {obj}),
        "end of": (obj) => i18n._("end of %(obj)s", {obj}),
        Baseline: i18n._("Baseline"),
        Superscript: i18n._("Superscript"),
        selected: (obj) => i18n._("%(obj)s selected", {obj}),
        "no answer": i18n._("no answer"),
        "nothing selected": i18n._("nothing selected"),
        "nothing to the right": i18n._("nothing to the right"),
        "nothing to the left": i18n._("nothing to the left"),
        "block is empty": i18n._("block is empty"),
        "nothing above": i18n._("nothing above"),
        labelValue: (label, value) =>
            i18n._("%(label)s: %(value)s", {label, value}),
    } satisfies MathQuillAriaStatisStringsMap,
};

/* eslint-disable import/no-named-as-default */
// As new widgets get added here, please also make sure they get added in
// content_internal/perseus_traversal.py so they can be properly translated.

import type {WidgetExports} from "./types";
import Expression from "./widgets/expression";
import InputNumber from "./widgets/input-number";
import NumericInput from "./widgets/numeric-input";
import Radio from "./widgets/radio";

export default [
    Radio,
    InputNumber,
    NumericInput,
    Expression,
] as ReadonlyArray<WidgetExports>;

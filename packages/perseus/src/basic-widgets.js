// @flow
// As new widgets get added here, please also make sure they get added in
// content_internal/perseus_traversal.py so they can be properly translated.
import Expression from "./widgets/expression.jsx";
import InputNumber from "./widgets/input-number.jsx";
import NumericInput from "./widgets/numeric-input.jsx";
import Radio from "./widgets/radio.jsx";

import type {WidgetExports} from "./types.js";

export default ([Radio, InputNumber, NumericInput, Expression]: $ReadOnlyArray<
    WidgetExports<>,
>);

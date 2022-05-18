// @flow
import Rule from "../rule.js";

export default (Rule.makeRule({
    name: "image-in-table",
    severity: Rule.Severity.BULK_WARNING,
    selector: "table image",
    message: `Image in table:
do not put images inside of tables.`,
}): Rule);

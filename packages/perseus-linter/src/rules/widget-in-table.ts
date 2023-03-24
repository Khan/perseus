import Rule from "../rule";

export default Rule.makeRule({
    name: "widget-in-table",
    severity: Rule.Severity.BULK_WARNING,
    selector: "table widget",
    message: `Widget in table:
do not put widgets inside of tables.`,
}) as Rule;

import Rule from "../rule";

export default Rule.makeWidgetRule({
    name: "label-image-widget-error",
    widgetType: "label-image",
    severity: Rule.Severity.ERROR,
    lint(widget) {
        const issues: string[] = [];
        const {choices, imageAlt, imageUrl, markers} = widget.options;

        if (choices.length < 2) {
            issues.push(
                "label-image widget must have at least two answer choices",
            );
        }

        if (!imageUrl) {
            issues.push("No image url provided");
        } else if (!imageAlt) {
            issues.push("No image alt text provided");
        }

        if (markers.length === 0) {
            issues.push("label-image widget requires at least one marker");
        } else {
            let numNoAnswers = 0;
            let numNoLabels = 0;

            for (const marker of markers) {
                if (marker.answers.length === 0) {
                    numNoAnswers++;
                }

                if (!marker.label) {
                    numNoLabels++;
                }
            }

            if (numNoAnswers > 0) {
                issues.push(
                    `label-image widget has ${numNoAnswers} markers with no answers selected`,
                );
            }

            if (numNoLabels > 0) {
                issues.push(
                    `label-image widget has ${numNoLabels} markers with no ARIA label`,
                );
            }
        }

        return issues;
    },
});

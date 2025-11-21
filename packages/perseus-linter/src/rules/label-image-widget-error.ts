import Rule from "../rule";

export default Rule.makeRule({
    name: "label-image-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at label-image widgets
        if (state.currentNode().widgetType !== "label-image") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        const widget = context?.widgets?.[nodeId];
        if (!widget) {
            return;
        }

        const warnings: Array<string> = [];
        const {choices, imageAlt, imageUrl, markers} = widget.options;

        if (choices.length < 2) {
            warnings.push("Question requires at least two answer choices");
        }

        if (!imageUrl) {
            warnings.push("Image is not specified for question");
        } else if (!imageAlt) {
            warnings.push("Question image has no alt text");
        }

        if (!markers.length) {
            warnings.push("Question has no markers, to label answers on image");
        } else {
            let numNoAnswers = 0;
            let numNoLabels = 0;

            for (const marker of markers) {
                if (!marker.answers.length) {
                    numNoAnswers++;
                }

                if (!marker.label) {
                    numNoLabels++;
                }
            }

            if (numNoAnswers > 0) {
                warnings.push(
                    `Question has ${numNoAnswers} markers with no answers selected`,
                );
            }

            if (numNoLabels > 0) {
                warnings.push(
                    `Question has ${numNoLabels} markers with no ARIA label`,
                );
            }
        }

        const allWarningsString = warnings.join("\n\n");
        return allWarningsString;
    },
}) as Rule;

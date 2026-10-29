import Rule from "../rule";

// Normally we have one rule per file. But since our selector class
// can't match specific widget types directly, this rule implements
// a number of image widget related rules in one place. This should
// slightly increase efficiency, but it means that if there is more
// than one problem with an image widget, the user will only see one
// problem at a time.
export default Rule.makeWidgetRule({
    name: "image-widget-empty-size",
    widgetType: "image",
    severity: Rule.Severity.WARNING,
    lint(widget) {
        if (!widget.options.backgroundImage.url) {
            return;
        }

        const {width, height} = widget.options.backgroundImage;

        if (!width || !height) {
            return `Images should have a non-zero size.
This image has a width of ${width} and a height of ${height}.
Please use the "Reset to original size" button to set the size of the image.`;
        }
    },
});

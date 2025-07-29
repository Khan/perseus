import {AccordionSection} from "@khanacademy/wonder-blocks-accordion";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    animated?: boolean;
    children: React.ReactNode | React.ReactNode[];
    header: string | React.ReactElement;
    expanded?: boolean;
    containerStyle?: StyleType;
    panelStyle?: StyleType;
    headerStyle?: StyleType;
    onToggle?: (expanded: boolean) => void;
};

const PerseusEditorAccordion = (props: Props) => {
    const {
        animated,
        children,
        header,
        expanded,
        containerStyle,
        panelStyle,
        headerStyle,
        onToggle,
    } = props;

    return (
        <View
            // More specificity so that we can override the default
            // .heading > h2 > .header styles from the articles.less
            // file (which is imported in perseus-renderer.less).
            className="perseus-editor-accordion"
        >
            <AccordionSection
                animated={animated}
                expanded={expanded}
                onToggle={onToggle}
                style={[styles.container, containerStyle]}
                headerStyle={[styles.accordionHeader, headerStyle]}
                header={header}
            >
                <View style={[styles.accordionPanel, panelStyle]}>
                    {children}
                </View>
            </AccordionSection>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: semanticColor.core.background.instructive.subtle,
        marginTop: spacing.xSmall_8,
    },
    accordionHeader: {
        padding: spacing.small_12,
        // Don't move the dropdown caret.
        paddingInlineEnd: 0,
        // Fixed height so the addition of the color swatch doesn't
        // change the height of the header when toggling.
        height: spacing.xxLarge_48,
    },
    accordionPanel: {
        paddingTop: spacing.xxSmall_6,
        paddingBottom: spacing.xxxSmall_4,
        paddingLeft: spacing.small_12,
        paddingRight: spacing.small_12,
    },
});

export default PerseusEditorAccordion;

import {components} from "@khanacademy/perseus";
import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import Pill from "@khanacademy/wonder-blocks-pill";
import Switch from "@khanacademy/wonder-blocks-switch";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Heading from "../../../components/heading";

const {InfoTip} = components;
const StyledUl = addStyle("ul");

type Attribute = {
    name: string;
    value: string;
};

type AttributeMap = {
    roleOrTag: string;
    className: string;
    attributes: Array<Attribute>;
};

// Exported for testing
export function getAccessibilityAttributes(graphId: string): AttributeMap[] {
    const elementArias: Array<AttributeMap> = [];

    // TODO(nisha): Change this to use ref after the graph has a non-string
    // ref and the InteractiveGraph component forwards refs.
    const container = document.getElementById(graphId);

    if (!container) {
        return elementArias;
    }

    // Traverse through all the children of the container and
    // collect the aria-labels and aria-descriptions.
    container.querySelectorAll("*").forEach((element) => {
        // List to return with all the aria-labels and aria-descriptions.
        const elementAttributes: Array<Attribute> = [];

        const ariaLabel = element.getAttribute("aria-label");
        const ariaDescribedby = element.getAttribute("aria-describedby");

        if (ariaLabel) {
            // Add the aria-label to the front of the array so
            // it shows up first for this element in the tree.
            elementAttributes.unshift({
                name: "label",
                value: ariaLabel,
            });
        }
        if (ariaDescribedby) {
            // Aria-description is a space-separated list of ids.
            // Use the ids to get the actual description strings.
            const descriptions = ariaDescribedby.split(/ +/);
            for (const description of descriptions) {
                const descriptionString =
                    document.getElementById(description)?.textContent;

                if (descriptionString) {
                    elementAttributes.push({
                        name: "description",
                        value: descriptionString,
                    });
                }
            }
        }

        // Only push the element to the list if it has aria-labels
        // or aria-descriptions.
        if (elementAttributes.length > 0) {
            elementArias.push({
                roleOrTag:
                    element.getAttribute("role") ||
                    element.tagName.toLowerCase(),
                // Use the last class in the list of classes to avoid the
                // prepend classes that are not relevant, such as the
                // obscured inline styles.
                className:
                    element.classList[element.classList.length - 1] || "",
                attributes: elementAttributes,
            });
        }
    });

    return elementArias;
}

type Props = {
    elementArias: Array<AttributeMap>;
    showTags: boolean;
};

function SRTree(props: Props) {
    const {elementArias, showTags} = props;

    // Each list item of this ordered list is the role/rag of the element
    // followed by an unordered list of its aria attributes.
    return (
        <ol style={{listStyle: "revert", marginLeft: 8}}>
            {elementArias.map((aria, index) => (
                <li key={index}>
                    {showTags && (
                        <Pill
                            size="small"
                            kind="success"
                            style={styles.smallSpaceRight}
                        >
                            {aria.roleOrTag}
                        </Pill>
                    )}
                    {aria.className}
                    <StyledUl style={styles.indentListLeft}>
                        {aria.attributes.map((value, index) => (
                            <li key={index}>
                                <Pill
                                    size="small"
                                    kind={
                                        value.name === "label"
                                            ? "info"
                                            : "neutral"
                                    }
                                    style={styles.smallSpaceRight}
                                >
                                    {value.name}
                                </Pill>
                                {value.value}
                            </li>
                        ))}
                    </StyledUl>
                </li>
            ))}
        </ol>
    );
}

function InteractiveGraphSRTree({
    // The graph whos accessibility tree we want to display.
    // This is necessary when there are multiple graphs on the editor
    // page, such as when there are also hints.
    graphId,
    correct,
    fullGraphAriaLabel,
    fullGraphAriaDescription,
    lockedFigures,
}) {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const [showTags, setShowTags] = React.useState(false);
    const [elementArias, setElementArias] = React.useState<AttributeMap[]>([]);
    const switchId = React.useId();

    // Update the tree when the graph is updated.
    React.useEffect(() => {
        setElementArias(getAccessibilityAttributes(graphId));
    }, [
        // Update the tree when the "correct preview" graph is updated.
        correct,
        fullGraphAriaLabel,
        fullGraphAriaDescription,
        graphId,
        lockedFigures,
    ]);

    return (
        <>
            <Heading
                title="Screen reader tree"
                isOpen={isExpanded}
                onToggle={setIsExpanded}
                isCollapsible={true}
            />
            {isExpanded && (
                <>
                    <View style={[styles.row, styles.tagSwitch]}>
                        <Switch
                            id={switchId}
                            checked={showTags}
                            onChange={setShowTags}
                        />
                        <Strut size={spacing.xSmall_8} />
                        <LabelSmall tag="label" htmlFor={switchId}>
                            Show HTML roles/tags
                        </LabelSmall>
                        <Spring />
                        <InfoTip>
                            This screen reader tree shows the ARIA labels and
                            descriptions for elements within the "correct
                            answer" Interactive Graph widget displayed above.
                        </InfoTip>
                    </View>
                    <SRTree elementArias={elementArias} showTags={showTags} />
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    smallSpaceRight: {
        marginRight: spacing.xxSmall_6,
    },
    indentListLeft: {
        listStyle: "revert",
        marginLeft: spacing.small_12,
    },
    tagSwitch: {
        marginTop: spacing.xSmall_8,
        marginBottom: spacing.xSmall_8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default InteractiveGraphSRTree;

import Pill from "@khanacademy/wonder-blocks-pill";
import * as React from "react";

import Heading from "../../../components/heading";

type Attribute = {
    name: string;
    value: string;
};

type AttributeMap = {
    role: string;
    attributes: Array<Attribute>;
};

// Exported for testing
export function getAccessibilityAttributes(
    container?: Element,
): AttributeMap[] {
    const elementArias: Array<AttributeMap> = [];

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
                role:
                    element.getAttribute("role") ||
                    element.tagName.toLowerCase(),
                attributes: elementAttributes,
            });
        }
    });

    return elementArias;
}

type Props = {
    elementArias: Array<AttributeMap>;
};

function SRTree(props: Props) {
    const {elementArias} = props;

    // Each list item of this ordered list is the role/rag of the element
    // followed by an unordered list of its aria attributes.
    return (
        <ol style={{listStyle: "revert", marginLeft: 8}}>
            {elementArias.map((ariaString, index) => (
                <li key={index}>
                    {ariaString.role}
                    <ul style={{listStyle: "revert", marginLeft: 8}}>
                        {ariaString.attributes.map((value, index) => (
                            <li key={index}>
                                <Pill
                                    size="small"
                                    kind={
                                        value.name === "label"
                                            ? "info"
                                            : "neutral"
                                    }
                                >
                                    {value.name}
                                </Pill>{" "}
                                {value.value}
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ol>
    );
}

function InteractiveGraphSRTree({
    correct,
    fullGraphAriaLabel,
    fullGraphAriaDescription,
    lockedFigures,
}) {
    const [isExpanded, setIsExpanded] = React.useState(true);
    const [elementArias, setElementArias] = React.useState<AttributeMap[]>([]);

    // TODO(nisha): Change this to use ref after the graph has a non-string
    // ref and the InteractiveGraph component forwards refs.
    const mafsGraphContainer = document.getElementsByClassName(
        "mafs-graph-container",
    )?.[0];

    // Update the tree when the graph is updated.
    React.useEffect(() => {
        setElementArias(getAccessibilityAttributes(mafsGraphContainer));
    }, [
        // Update the tree when the "correct preview" graph is updated.
        correct,
        fullGraphAriaLabel,
        fullGraphAriaDescription,
        lockedFigures,
        mafsGraphContainer,
    ]);

    return (
        <>
            <Heading
                title="Screen reader tree"
                isOpen={isExpanded}
                onToggle={setIsExpanded}
                isCollapsible={true}
            />
            {isExpanded && <SRTree elementArias={elementArias} />}
        </>
    );
}

export default InteractiveGraphSRTree;

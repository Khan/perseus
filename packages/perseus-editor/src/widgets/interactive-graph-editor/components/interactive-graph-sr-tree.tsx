import Pill from "@khanacademy/wonder-blocks-pill";
import * as React from "react";

import Heading from "../../../components/heading";

type Attribute = {
    name: string;
    value: string;
};

type AttributeMap = {
    role: string;
    values: Array<Attribute>;
};

function fetchAriaLabels(container: Element): AttributeMap[] {
    const elementArias: Array<AttributeMap> = [];

    if (!container) {
        return elementArias;
    }

    container.querySelectorAll("*").forEach((element) => {
        const elementAttributes: Array<Attribute> = [];
        const attributes = element.attributes;

        for (const attribute of attributes) {
            if (attribute.name === "aria-label") {
                elementAttributes.unshift({
                    name: "label",
                    value: attribute.value,
                });
            }
            if (attribute.name === "aria-describedby") {
                // Aria-description is a space-separated list of ids.
                // Use the ids to get the actual description strings.
                const descriptions = attribute.value.split(" ");
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
        }

        if (elementAttributes.length > 0) {
            elementArias.push({
                role:
                    element.getAttribute("role") ||
                    element.tagName.toLowerCase(),
                values: elementAttributes,
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
                        {ariaString.values.map((value, index) => (
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

    const mafsGraphContainer = document.getElementsByClassName(
        "mafs-graph-container",
    )?.[0];

    // Update the tree when the graph is updated.
    React.useEffect(() => {
        setElementArias(fetchAriaLabels(mafsGraphContainer));
    }, [
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

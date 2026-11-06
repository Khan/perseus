import * as React from "react";

import Heading from "../../components/heading";

type Props = {
    title: string;
    children: React.ReactNode;
};

/**
 * A section that opens and closes under its heading, as on interactive
 * graph.
 */
export function CollapsibleSection({title, children}: Props) {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
        <>
            <Heading
                title={title}
                isOpen={isOpen}
                isCollapsible={true}
                onToggle={setIsOpen}
            />
            {isOpen && children}
        </>
    );
}

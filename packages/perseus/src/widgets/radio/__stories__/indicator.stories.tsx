import * as React from "react";

import Indicator from "../multiple-choice-indicator";

const Container = (props: {children: React.ReactNode}): React.ReactElement => {
    return <div style={{padding: "10px"}}>{props.children}</div>;
};

export default {
    title: "Perseus/Widgets/Radio/Indcator",
    args: {
        checked: false,
        content: "A",
        shape: "circle",
    },
};

export const AllSettings = (): React.ReactElement => {
    return (
        <Container>
            <Indicator
                checked={false}
                shape="circle"
                content="A"
                updateChecked={() => {}}
            />
            <Indicator
                checked={false}
                shape="circle"
                content="✓A"
                updateChecked={() => {}}
            />
            <Indicator
                checked={false}
                shape="circle"
                content="A"
                showCorrectness="correct"
                updateChecked={() => {}}
            />
        </Container>
    );
};

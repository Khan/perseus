import * as React from "react";

import Choice from "../choice.new";

const Container = (props: {children: React.ReactNode}): React.ReactElement => {
    return (
        <ul
            style={{
                margin: "10px",
                width: "672px",
            }}
        >
            {props.children}
        </ul>
    );
};

export default {
    title: "Perseus/Widgets/Radio/Widget Internal Components/Choice",
};

export const SingleSelect = (): React.ReactElement => {
    return (
        <Container>
            <Choice
                checked={false}
                indicatorContent="A"
                isMultiSelect={false}
                updateChecked={() => {}}
            >
                USS Sarajevo - NCC-38529
            </Choice>
            <Choice
                checked={false}
                indicatorContent="B"
                isMultiSelect={false}
                updateChecked={() => {}}
            >
                USS Yangtzee Kiang - NCC-72453 - Hijacked by Bajoran terrorist
                Tahna Los. Became the first DS9 runabout to be destroyed when it
                crashed on a moon in the Gamma Quadrant.
            </Choice>
            <Choice
                checked={false}
                indicatorContent="C"
                isMultiSelect={false}
                updateChecked={() => {}}
            >
                <img
                    alt="triangle"
                    src="https://cdn.kastatic.org/ka-content-images/9cb2cf618c16501d01abf97036deb355d9393949.png"
                />
            </Choice>
            <Choice
                checked={true}
                indicatorContent="D"
                isMultiSelect={false}
                showCorrectness="wrong"
                updateChecked={() => {}}
            >
                ISS Enterprise - NCC-1701 (Mirror Universe)
            </Choice>
            <Choice
                checked={false}
                indicatorContent="E"
                isMultiSelect={false}
                updateChecked={() => {}}
            >
                USS Yamaguchi - NCC-26510
            </Choice>
            <Choice
                checked={true}
                indicatorContent="F"
                isMultiSelect={false}
                showCorrectness="correct"
                updateChecked={() => {}}
            >
                USS Enterprise - NCC-1701
            </Choice>
        </Container>
    );
};

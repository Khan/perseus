import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";
import React, {useRef} from "react";

import Indicator from "../choice-indicator.new";

const Container = (props: {children: React.ReactNode}): React.ReactElement => {
    return (
        <div
            style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBlockEnd: "25px",
            }}
        >
            {props.children}
        </div>
    );
};

export default {
    title: "Widgets/Radio/Widget Internal Components/Indicator",
    tags: ["!dev"],
};

export const AllSettings = (): React.ReactElement => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
        <>
            <Container>
                <HeadingMedium tag="h2">Single Select</HeadingMedium>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={false}
                        shape="circle"
                        content="A"
                        updateChecked={() => {}}
                    />
                    &nbsp;Selectable
                </div>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={true}
                        shape="circle"
                        content="A"
                        updateChecked={() => {}}
                    />
                    &nbsp;Checked/Selected
                </div>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={false}
                        shape="circle"
                        content="A"
                        showCorrectness="correct"
                        updateChecked={() => {}}
                    />
                    &nbsp;Is correct &amp; Not Checked
                </div>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={true}
                        shape="circle"
                        content="A"
                        showCorrectness="correct"
                        updateChecked={() => {}}
                    />
                    &nbsp;Is correct &amp; Checked
                </div>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={true}
                        shape="circle"
                        content="A"
                        showCorrectness="wrong"
                        updateChecked={() => {}}
                    />
                    &nbsp;Is wrong &amp; Checked
                </div>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={false}
                        shape="circle"
                        content="A"
                        showCorrectness="wrong"
                        updateChecked={() => {}}
                    />
                    &nbsp;Is wrong &amp; Not Checked
                </div>
            </Container>
            <Container>
                <HeadingMedium tag="h2">Multiple Select</HeadingMedium>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={false}
                        shape="square"
                        content="A"
                        updateChecked={() => {}}
                    />
                    &nbsp;Selectable
                </div>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={true}
                        shape="square"
                        content="A"
                        updateChecked={() => {}}
                    />
                    &nbsp;Checked/Selected
                </div>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={false}
                        shape="square"
                        content="A"
                        showCorrectness="correct"
                        updateChecked={() => {}}
                    />
                    &nbsp;Is correct &amp; Not Checked
                </div>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={true}
                        shape="square"
                        content="A"
                        showCorrectness="correct"
                        updateChecked={() => {}}
                    />
                    &nbsp;Is correct &amp; Checked
                </div>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={true}
                        shape="square"
                        content="A"
                        showCorrectness="wrong"
                        updateChecked={() => {}}
                    />
                    &nbsp;Is wrong &amp; Checked
                </div>
                <div>
                    <Indicator
                        buttonRef={buttonRef}
                        checked={false}
                        shape="square"
                        content="A"
                        showCorrectness="wrong"
                        updateChecked={() => {}}
                    />
                    &nbsp;Is wrong &amp; Not Checked
                </div>
            </Container>
        </>
    );
};

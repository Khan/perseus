import Switch from "@khanacademy/wonder-blocks-switch";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import {useState} from "react";

import type {CSSProperties} from "react";

type BoundaryRect = {
    top: number;
    left: number;
    height: number;
    width: number;
};

const ShowMe = ({elements}: {elements?: Element[]}) => {
    const [showMe, setShowMe] = useState(false);

    if (!elements || elements.length === 0) {
        return null;
    }
    const issueBoundary = elements?.reduce(
        (boundary: BoundaryRect, element: Element, index: number) => {
            const elementBoundary = element.getBoundingClientRect();
            boundary.top += elementBoundary.top;
            boundary.left += elementBoundary.left;
            if (index === elements.length - 1) {
                boundary.height = elementBoundary.height;
                boundary.width = elementBoundary.width;
            }
            return boundary;
        },
        {top: 0, left: 0, height: 0, width: 0},
    );
    const showMeStyle = {
        marginTop: "1em",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
    };
    const showMeOutlineStyle: CSSProperties =
        showMe && issueBoundary.width !== 0
            ? {
                  display: "block",
                  border: "2px solid red",
                  borderRadius: "4px",
                  position: "fixed",
                  height: issueBoundary.height + 8,
                  width: issueBoundary.width + 8,
                  top: issueBoundary.top - 4,
                  left: issueBoundary.left - 4,
              }
            : {display: "none"};

    const showMeToggle = (
        <LabelSmall style={showMeStyle}>
            <span style={{marginInlineEnd: "1em"}}>Show Me</span>
            <Switch checked={showMe} onChange={setShowMe} />
            <div style={showMeOutlineStyle} />
        </LabelSmall>
    );
    const showMeUnavailable = (
        <div>
            Unable to find the offending element. Please ask a developer for
            help fixing this.
        </div>
    );

    // eslint-disable-next-line
    return issueBoundary ? showMeToggle : showMeUnavailable;
};

export default ShowMe;

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
    const getIssueBoundary = (element: Element): BoundaryRect => {
        const iframeBoundary =
            element.ownerDocument.defaultView?.frameElement?.getBoundingClientRect();
        const elementBoundary = element.getBoundingClientRect();
        return {
            top: elementBoundary.top + (iframeBoundary?.top || 0),
            left: elementBoundary.left + (iframeBoundary?.left || 0),
            height: elementBoundary.height,
            width: elementBoundary.width,
        };
    };
    const showMeStyle = {
        marginTop: "1em",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
    };
    const getOutlineStyle = (issueBoundary: BoundaryRect): CSSProperties =>
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

    const elementOutlines = elements?.map((element, index) => {
        const issueBoundary = getIssueBoundary(element);
        const outlineStyle = getOutlineStyle(issueBoundary);
        return <div key={index} style={outlineStyle} />;
    });

    const showMeToggle = (
        <LabelSmall style={showMeStyle}>
            <span style={{marginInlineEnd: "1em"}}>Show Me</span>
            <Switch checked={showMe} onChange={setShowMe} />
            {elementOutlines}
        </LabelSmall>
    );
    const showMeUnavailable = (
        <div>
            Unable to find the offending element. Please ask a developer for
            help fixing this.
        </div>
    );

    // eslint-disable-next-line
    return Array.isArray(elementOutlines) && elementOutlines.length > 0
        ? showMeToggle
        : showMeUnavailable;
};

export default ShowMe;

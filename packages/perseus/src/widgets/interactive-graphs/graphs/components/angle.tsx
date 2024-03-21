import * as React from "react";

import type {vec} from "mafs";

interface Props {
    centerPoint: vec.Vector2;
    endPoints: [vec.Vector2, vec.Vector2];
    active: boolean;
}

export const Angle = (props: Props) => {
    const {centerPoint, endPoints} = props;
    const [centerX, centerY] = centerPoint;
    const [start, end] = endPoints;
    const [startX, startY] = start;
    const [endX, endY] = end;

    const radius = 0.5;

    const startAngle = Math.atan2(startY - centerY, startX - centerX);
    const endAngle = Math.atan2(endY - centerY, endX - centerX);
    const angle = endAngle - startAngle;
    const largeArcFlag = angle > Math.PI ? 1 : 0;
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x2} ${y2}`;

    return (
        <path
            d={d}
            style={{
                transform: `var(--mafs-view-transform) var(--mafs-user-transform)`,
                strokeWidth: 0.05,
            }}
        />
    );
};

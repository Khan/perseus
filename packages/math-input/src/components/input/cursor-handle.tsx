/**
 * Renders the green tear-shaped handle under the cursor.
 */

import * as React from "react";

import {
    cursorHandleRadiusPx,
    cursorHandleDistanceMultiplier,
} from "./cursor-styles";

const touchTargetRadiusPx = 2 * cursorHandleRadiusPx;
const touchTargetHeightPx = 2 * touchTargetRadiusPx;
const touchTargetWidthPx = 2 * touchTargetRadiusPx;

const cursorRadiusPx = cursorHandleRadiusPx;
const cursorHeightPx = cursorHandleDistanceMultiplier * (cursorRadiusPx * 4);
const cursorWidthPx = 4 * cursorRadiusPx;

type Props = {
    animateIntoPosition: boolean;
    onTouchCancel: (arg1: React.TouchEvent<HTMLSpanElement>) => void;
    onTouchEnd: (arg1: React.TouchEvent<HTMLSpanElement>) => void;
    onTouchMove: (arg1: React.TouchEvent<HTMLSpanElement>) => void;
    onTouchStart: (arg1: React.TouchEvent<HTMLSpanElement>) => void;
    visible: boolean;
    x: number;
    y: number;
};

type DefaultProps = {
    animateIntoPosition: Props["animateIntoPosition"];
    visible: Props["visible"];
    x: Props["x"];
    y: Props["y"];
};

class CursorHandle extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        animateIntoPosition: false,
        visible: false,
        x: 0,
        y: 0,
    };

    render(): React.ReactNode {
        const {x, y, animateIntoPosition} = this.props;

        const animationStyle = animateIntoPosition
            ? {
                  transitionDuration: "100ms",
                  transitionProperty: "transform",
              }
            : {};
        const transformString = `translate(${x}px, ${y}px)`;

        const outerStyle = {
            position: "absolute",
            zIndex: 4,
            left: -touchTargetWidthPx / 2,
            top: 0,
            transform: transformString,
            width: touchTargetWidthPx,
            height: touchTargetHeightPx,
            // Touch events that start on the cursor shouldn't be allowed to
            // produce page scrolls.
            touchAction: "none",
            ...animationStyle,
        } as const;

        return (
            <span
                style={outerStyle}
                onTouchStart={this.props.onTouchStart}
                onTouchMove={this.props.onTouchMove}
                onTouchEnd={this.props.onTouchEnd}
                onTouchCancel={this.props.onTouchCancel}
            >
                <svg
                    fill="none"
                    width={cursorWidthPx}
                    height={cursorHeightPx}
                    viewBox={`0 0 ${cursorWidthPx} ${cursorHeightPx}`}
                >
                    <filter
                        id="math-input_cursor"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                        height={cursorHeightPx * 0.87} // ~40
                        width={cursorWidthPx * 0.82} // ~36
                        x="4"
                        y="0"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="4" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.129412 0 0 0 0 0.141176 0 0 0 0 0.172549 0 0 0 0.08 0"
                        />
                        <feBlend
                            in2="BackgroundImageFix"
                            mode="normal"
                            result="effect1_dropShadow"
                        />
                        <feBlend
                            in="SourceGraphic"
                            in2="effect1_dropShadow"
                            mode="normal"
                            result="shape"
                        />
                    </filter>
                    <g filter="url(#math-input_cursor)">
                        <path
                            d="m22 4-7.07 7.0284c-1.3988 1.3901-2.3515 3.1615-2.7376 5.09-.3861 1.9284-.1883 3.9274.5685 5.7441s2.0385 3.3694 3.6831 4.4619c1.6445 1.0925 3.5781 1.6756 5.556 1.6756s3.9115-.5831 5.556-1.6756c1.6446-1.0925 2.9263-2.6452 3.6831-4.4619s.9546-3.8157.5685-5.7441c-.3861-1.9285-1.3388-3.6999-2.7376-5.09z"
                            fill="#1865f2"
                        />
                    </g>
                    <path
                        d="m14.9301 10.4841 7.0699-7.06989 7.0699 7.06989.0001.0001c1.3988 1.3984 2.3515 3.1802 2.7376 5.1201s.1883 3.9507-.5685 5.7782c-.7568 1.8274-2.0385 3.3894-3.6831 4.4883-1.6445 1.099-3.5781 1.6855-5.556 1.6855s-3.9115-.5865-5.556-1.6855c-1.6446-1.0989-2.9263-2.6609-3.6831-4.4883-.7568-1.8275-.9546-3.8383-.5685-5.7782s1.3388-3.7217 2.7376-5.1201z"
                        stroke="#fff"
                        strokeWidth="2"
                    />
                </svg>
            </span>
        );
    }
}

export default CursorHandle;

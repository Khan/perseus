import {addStyle} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    style?: StyleType;
};

const StyledSVG = addStyle("svg");

export const KhanmigoIcon = ({style}: Props) => {
    return (
        <StyledSVG
            width="26"
            height="26"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
        >
            <path
                d="M5.01492 0.125977H25.8523C28.622 0.125977 30.8672 2.37124 30.8672 5.14091V27.82C30.8672 30.0087 28.2594 31.1468 26.6547 29.6584L24.9663 28.0925C24.5027 27.6625 23.8936 27.4235 23.2612 27.4235H2.50746C1.12263 27.4235 0 26.3009 0 24.9161V5.1409C0 2.37124 2.24526 0.125977 5.01492 0.125977Z"
                fill="#DEAE93"
            />
            <circle cx="8.81796" cy="15.1043" r="6.01791" fill="white" />
            <mask
                id="mask0_224_5030"
                style={{maskType: "alpha"}}
                maskUnits="userSpaceOnUse"
                x="2"
                y="9"
                width="13"
                height="13"
            >
                <circle cx="8.81796" cy="15.1043" r="6.01791" fill="white" />
            </mask>
            <g mask="url(#mask0_224_5030)">
                <circle cx="4.20004" cy="12.7391" r="6.16" fill="black" />
            </g>
            <circle cx="21.9779" cy="15.1041" r="6.01791" fill="white" />
            <mask
                id="mask1_224_5030"
                style={{maskType: "alpha"}}
                maskUnits="userSpaceOnUse"
                x="15"
                y="9"
                width="13"
                height="13"
            >
                <circle cx="21.9779" cy="15.1041" r="6.01791" fill="white" />
            </mask>
            <g mask="url(#mask1_224_5030)">
                <circle cx="17.36" cy="12.7389" r="6.16" fill="black" />
            </g>
        </StyledSVG>
    );
};

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {CSSProperties} from "aphrodite";

export type AnimationStyles = {
    enter?: StyleType;
    enterActive?: StyleType;
    leave?: StyleType;
    leaveActive?: StyleType;
    appear?: StyleType;
    appearActive?: StyleType;
};

export type InAnimationStyles = {
    enter?: CSSProperties;
    enterActive?: CSSProperties;
    leave?: CSSProperties;
    leaveActive?: CSSProperties;
    appear?: CSSProperties;
    appearActive?: CSSProperties;
};

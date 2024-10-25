import type {CSSProperties} from "aphrodite";

export const colors = {
    white: "#FFFFFF",
    gray98: "#FAFAFA",
    gray95: "#F0F1F2",
    gray85: "#D6D8DA",
    gray76: "#BABEC2",
    gray68: "#888D93",
    gray41: "#626569",
    gray17: "#21242C",
} as const;

// TODO: can we use WB typography?
export const bodyXsmallBold: CSSProperties = {
    // For emphasized metadata, descriptions, etc
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: "22px",
};

import {
    alertRed,
    homepageBlue,
    kaGreen,
    kaGreenLight,
    kaBlue,
    kaBlueLight,
    learnstormBlue,
    backgroundBlue,
} from "./global-constants";

import type {StyleDeclaration} from "aphrodite";

export const colors = {
    white: "#FFFFFF",
    gray98: "#FAFAFA",
    gray97: "#F6F7F7",
    gray95: "#F0F1F2",
    gray90: "#E3E5E6",
    gray85: "#D6D8DA",
    gray76: "#BABEC2",
    gray72: "#999A9D",
    gray68: "#888D93",
    gray55: "#707378",
    gray41: "#626569",
    gray25: "#3B3E40",
    gray17: "#21242C",
    gray10: "#1499af",
    black: "#000000",

    // These colors are pulled out from constants.js, which is itself generated
    // from variables.less. We should probably avoid duplicating these here.
    alertRed,
    homepageBlue,
    kaBlue,
    kaBlueLight,
    kaGreen,
    kaGreenLight,
    learnstormBlue,
    backgroundBlue,

    adminGreen: "#78C008",
    kaBlueExtraLight: "#39c2db",
    kaBlueHover: "#0c7f99",
    kaGreenHover: "#518005",

    // Domain-agnostic colors related to the study guide experience in the
    // content library.
    skyDark: "#001f4d",
    recommendationGold: "#ffbe26",
    starAced: "#ff9c39",

    // We interploate the domain colors into this colors object for
    // historical reasons, but everyone using domain-specific colors
    // should switch to using the domainColors() function to look up
    // colors instead.
    //
    // TODO(davidflanagan): remove this line once everything is
    // working correctly with the domainColors() accessor.
    // ...domainToColorsMap,
    // mission: missionColors,

    // Colors for various OAuth providers
    google: "#C1432f",
    modernGoogle: "#be2612",
    modernGoogleHover: "#8c1c0d",
    facebook: "#4267B2",
    modernFacebook: "#4267B2",
    modernFacebookHover: "#00294a",

    wonderBlocksGold: "#FFB100",
    wonderBlocksLightBlue: "#37C5FD",

    // We're using rgba instead of opacity to avoid affecting the focus outline
    // when we just want to make the color transparent.
    breadcrumbs: "rgba(255, 255, 255, 0.7)",
} as const;

export const borderRadius = 4;

export const fonts = {
    // The body of the page is setup to use 'Helvetica' by default and
    // 'Lato' if/once it downloads. For your elements to follow this
    // pattern, all you need is to make the text in your element
    // inherit from the body using the "inherit" value.
    regular: "inherit",
} as const;

export const typography: StyleDeclaration = {
    smallSubheadingMobile: {
        fontFamily: "inherit",
        fontSize: 15,
        lineHeight: 1.25,
    },
    bodyXsmall: {
        // For metadata, descriptions, etc
        fontFamily: fonts.regular,
        fontSize: 15,
        lineHeight: "22px",
    },
    bodyXsmallBold: {
        // For emphasized metadata, descriptions, etc
        fontFamily: "inherit",
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: "22px",
    },
    labelSmall: {
        // Generally used with labelLarge, for breadcrumbs in thumbnails
        fontFamily: fonts.regular,
        fontSize: 12,
        lineHeight: "14px",
    },
};

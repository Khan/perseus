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
import mediaQueries from "./media-queries";

import type {CSSProperties, StyleDeclaration} from "aphrodite";

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

const breadcrumbStyles: CSSProperties = {
    color: colors.breadcrumbs,
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.8,
    lineHeight: "19px",
    textTransform: "uppercase",
    // Disable subpixel antialiasing for OSX (improves light on dark text)
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
};

export const fonts = {
    // The body of the page is setup to use 'Helvetica' by default and
    // 'Lato' if/once it downloads. For your elements to follow this
    // pattern, all you need is to make the text in your element
    // inherit from the body using the "inherit" value.
    regular: "inherit",
} as const;

export const typography: StyleDeclaration = {
    // For subject names
    subjectHeadingDesktop: {
        fontFamily: "inherit",
        fontSize: 50,
        fontWeight: "bold",
        lineHeight: "61px",
    },
    subjectHeadingMobile: {
        fontFamily: "inherit",
        fontSize: 35,
        fontWeight: "bold",
        lineHeight: "37px",
    },

    // For the most important thing on the page
    conceptHeadingDesktop: {
        fontFamily: "inherit",
        fontSize: 35,
        fontWeight: "bold",
        lineHeight: "37px",
    },
    conceptHeadingMobile: {
        fontFamily: "inherit",
        fontSize: 23,
        fontWeight: "bold",
        lineHeight: "27px",
    },

    // For sections or modules
    subheadingDesktop: {
        fontFamily: "inherit",
        fontSize: 23,
        fontWeight: "bold",
        lineHeight: "27px",
    },
    subheadingMobile: {
        fontFamily: "inherit",
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: "24px",
    },

    smallSubheadingDesktop: {
        fontFamily: "inherit",
        fontSize: 20,
        lineHeight: 1.25,
    },

    smallSubheadingMobile: {
        fontFamily: "inherit",
        fontSize: 15,
        lineHeight: 1.25,
    },

    // For callouts
    smallHeading: {
        color: colors.gray25,
        fontFamily: "inherit",
        fontSize: 17,
        fontWeight: "bold",
        lineHeight: "23px",
    },
    smallHeadingMobile: {
        color: colors.gray25,
        fontFamily: "inherit",
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: "18px",
    },

    // Accent headings
    accentHeading: {
        color: colors.gray68,
        fontFamily: "inherit",
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 0.8,
        lineHeight: "19px",
        textTransform: "uppercase",
    },

    bodyLarge: {
        // For articles with multiple paragraphs
        fontFamily: fonts.regular,
        fontSize: 20,
        lineHeight: "30px",
    },
    bodySmall: {
        // For small blocks of copy
        fontFamily: fonts.regular,
        fontSize: 17,
        fontWeight: "normal",
        lineHeight: "23px",
    },
    bodySmallBold: {
        // For small blocks of copy
        fontFamily: fonts.regular,
        fontSize: 17,
        fontWeight: "bold",
        lineHeight: "23px",
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
    breadcrumb: breadcrumbStyles, // For in-page tabs, breadcrumbs
    breadcrumbSmall: {
        // For in-page tabs and leaf page breadcrumbs
        ...breadcrumbStyles,
        fontSize: 12,
        lineHeight: "13px",
    },
    labelLarge: {
        // For chiclets and thumbnail titles
        fontFamily: "inherit",
        fontSize: 23,
        fontWeight: "bold",
        lineHeight: "27px",
    },
    labelMedium: {
        // For chiclets and thumbnail titles
        fontFamily: "inherit",
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: "18px",
    },
    labelSmall: {
        // Generally used with labelLarge, for breadcrumbs in thumbnails
        fontFamily: fonts.regular,
        fontSize: 12,
        lineHeight: "14px",
    },
    caption: {
        // For image captions
        fontFamily: fonts.regular,
        fontSize: 14,
        fontStyle: "italic",
        lineHeight: "17px",
    },
    desktopScalingOnMobile: {
        // For when you need Mobile Safari and friends to stick to desktop
        // sizes
        MozTextSizeAdjust: "100%",
        MsTextSizeAdjust: "100%",
        WebkitTextSizeAdjust: "100%",
    } as any,
    // TODO (josh): This should move to within <ModalHeader>
    modalSubtitle: {
        fontSize: 12,
        lineHeight: 1.65,
        // NOTE (josh): Font smoothing used here to create a 'medium' weight
        // font, between normal and bold, on webkit browsers.
        // This prop is an a11y risk when used on non-bold text, since it
        // makes text very thin, but it's fine on bold text.
        WebkitFontSmoothing: "antialiased",
        fontWeight: "bold",
    },

    // HACK(kevinb): temporary wonder blocks styles for header only
    // TODO(kevinb): use components from wonder-blocks-typography instead
    wonderBlocksHeader: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 24,
        paddingTop: 34,

        [mediaQueries.mdOrLarger]: {
            paddingBottom: 32,
        },
    },

    // HACK(kevinb): temporary wonder blocks styles for header only
    // TODO(kevinb): use components from wonder-blocks-typography instead
    wonderBlocksTitle: {
        color: colors.white,
        fontWeight: 900, // "Black" weight
        fontSize: 28,
        lineHeight: "32px",
        margin: 0,

        [mediaQueries.mdOrLarger]: {
            fontSize: 36,
            lineHeight: "40px",
        },
    },

    // HACK(kevinb): temporary wonder blocks styles for header only
    // TODO(kevinb): use components from wonder-blocks-typography instead
    wonderBlocksLabelLarge: {
        fontSize: 16,
        lineHeight: "20px",
        fontWeight: 700, // Bold
    },
};

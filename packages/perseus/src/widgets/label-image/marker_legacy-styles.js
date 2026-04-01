// TODO (LEMS-3815): Remove this file
const styles = {
    marker: {
        backgroundColor: "var(--wb-semanticColor-core-background-base-default)",
        borderRadius: "24px",
        boxShadow: "var(--wb-boxShadow-mid)",
        height: "2.4rem",
        marginLeft: "-1.2rem",
        marginTop: "-1.2rem",
        position: "absolute",
        width: "2.4rem",
    },
    markerActive: {
        outline:
            "0.2rem solid var(--wb-semanticColor-core-border-instructive-default)",
        outlineOffset: "0.2rem",
    },
    markerCorrect: {
        background: "var(--wb-semanticColor-core-foreground-success-strong)",
    },
    markerFilled: {
        backgroundColor:
            "var(--wb-semanticColor-core-background-instructive-subtle)",
        border: "4px solid var(--wb-semanticColor-core-border-instructive-default)",
    },
    markerGraded: {
        alignItems: "center",
        border: "2px solid var(--wb-semanticColor-core-border-knockout-default)",
        height: "2.4rem",
        justifyContent: "center",
        width: "2.4rem",
    },
    markerIcon: {
        alignItems: "center",
        border: "2px solid var(--wb-semanticColor-core-border-neutral-default)",
        borderRadius: "24px",
        boxSizing: "border-box",
        display: "flex",
        height: "2.4rem",
        justifyContent: "center",
        width: "2.4rem",
    },
    markerIncorrect: {
        background: "var(--wb-semanticColor-core-foreground-neutral-default)",
    },
    markerPulsateBase: {
        animationDirection: "alternate",
        animationDuration: "0.8s",
        animationIterationCount: "0",
        animationTimingFunction: "ease-in",
        transformOrigin: "50% 50%",
    },
    "markerPulsateBaseanimationName0%": {
        backgroundColor:
            "var(--wb-semanticColor-core-background-instructive-default)",
        transform: "scale(1)",
    },
    "markerPulsateBaseanimationName100%": {
        backgroundColor:
            "var(--wb-semanticColor-core-background-instructive-default)",
        transform: "scale(1.3)",
    },
    markerSelected: {
        backgroundColor:
            "var(--wb-semanticColor-core-background-instructive-default)",
        border: "solid 4px var(--wb-semanticColor-core-border-knockout-default)",
        borderRadius: "24px",
        boxShadow: "var(--wb-boxShadow-mid)",
        transform: "rotate(180deg)",
    },
    markerUnfilledPulsateInfinite: {animationIterationCount: "infinite"},
    markerUnfilledPulsateOnce: {animationIterationCount: "2"},
};

export default styles;

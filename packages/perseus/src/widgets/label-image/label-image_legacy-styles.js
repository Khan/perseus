// TODO (LEMS-3815): Remove this file
const styles = {
    imageContainer: {display: "flex"},
    imageInteractionDisabled: {pointerEvents: "none"},
    instructions: {paddingBottom: "1.6rem"},
    instructionsCaption: {paddingBottom: "1.6rem"},
    instructionsChoice: {
        alignItems: "center",
        display: "flex",
        margin: "0.8rem 0",
    },
    "instructionsChoice_not(_lastChild)__after": {
        background: "var(--wb-semanticColor-core-border-neutral-subtle)",
        borderRadius: "2px",
        content: "''",
        display: "inline-block",
        height: "0.2rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        position: "relative",
        width: "0.2rem",
    },
    instructionsChoices: {
        display: "flex",
        flexWrap: "wrap",
        margin: "-0.8rem 0",
    },
    markersCanvas: {position: "relative"},
};

export default styles;

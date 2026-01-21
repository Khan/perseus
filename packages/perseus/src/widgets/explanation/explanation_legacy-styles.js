// TODO (LEMS-3815): Remove this file
const styles = {
    buttonStyleOverrides: {
        height: "auto",
        lineHeight: "inherit",
        marginLeft: "-0.2rem",
        marginRight: "0.2rem",
        paddingLeft: "0.2rem",
    },
    content: {
        borderLeft: "0px solid #ccc",
        display: "inline-grid",
        position: "relative",
    },
    contentCollapsed: {
        gridTemplateColumns: "0fr",
        gridTemplateRows: "0fr",
        marginBottom: "0",
        marginTop: "0",
        minWidth: "0",
        paddingBottom: "0",
        visibility: "hidden",
    },
    contentExpanded: {
        borderLeftWidth: "5px",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        marginBottom: "1.4rem",
        marginLeft: "-2.3rem",
        marginTop: "1.4rem",
        minWidth: "100%",
        paddingBottom: "1rem",
        paddingLeft: "2.3rem",
        visibility: "visible",
    },
    contentWrapper: {overflow: "hidden"},
    labelStyle: {
        fontSize: "var(--wb-font-heading-size-medium)",
        lineHeight: "inherit",
        marginRight: "-0.6rem",
        textAlign: "left",
        whiteSpace: "normal",
    },
    transitionCollapsed: {
        transition:
            "all 0.25s step-end, grid-template-rows 0.25s, margin-top 0.25s, margin-bottom 0.25s, padding-bottom 0.25s",
    },
    transitionExpanded: {
        transition:
            "grid-template-rows 0.5s, margin-top 0.5s, margin-bottom 0.5s, padding-bottom 0.5s",
    },
};

export default styles;

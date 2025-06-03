export const CHOICE_ICON_SIZE = 24;

const styles = {
    iconWrapper: {
        display: "inline-block",
        position: "relative",
        // This will ensure content will be scrolled behind the ChoiceIcon and will not be visible
        // TODO: LEMS-3108 address light/dark mode theme
        background: "linear-gradient(to right, white 10%, transparent)",
    },
} as const;
export default styles;

import React, {useRef} from "react";

import Indicator from "./choice-indicator.new";
import styles from "./choice.module.css";

import type {IndicatorContent} from "./choice-indicator.new";

export interface IndicatorProps {
    checked: boolean;
    children: React.ReactNode | React.ReactNode[];
    indicatorContent: IndicatorContent;
    isMultiSelect: boolean;
    showCorrectness?: "correct" | "wrong";
    updateChecked: (isChecked: boolean) => void;
}
/*
 * NOTE: Redundant ARIA roles for <li> element
 *          Redundant roles were added to address the issue of different screen
 *          readers handling <fieldset> and <legend> elements inconsistently.
 *          `role="listitem"` attribute preserves list semantics, as some screen
 *          readers may remove the implicit list role when `list-style: none` is
 *          applied via CSS.
 */

const Choice = (props: IndicatorProps) => {
    const showCorrectness = props.showCorrectness;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const indicatorShape = props.isMultiSelect ? "square" : "circle";
    const clickHandler = showCorrectness
        ? undefined
        : () => {
              buttonRef.current?.click();
          };
    const classes = [styles.choice]
        .concat(showCorrectness ? [styles["is-" + showCorrectness]] : [])
        .join(" ");
    return (
        /*
            A click handler is added to the <li> element to accommodate mouse users.
            Keyboard users will still be able to use the <button> element inside
                the <Indicator>.
            Therefore, WCAG 2.1.1 is still satisfied since functionality is
                aligned with the input method.
         */
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-redundant-roles
        <li className={classes} onClick={clickHandler} role="listitem">
            <Indicator
                buttonRef={buttonRef}
                checked={props.checked}
                content={props.indicatorContent}
                shape={indicatorShape}
                showCorrectness={showCorrectness}
                updateChecked={props.updateChecked}
            />
            {props.children}
        </li>
    );
};

export default Choice;

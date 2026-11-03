import React, {useRef} from "react";

import Indicator from "./choice-indicator";
import styles from "./choice.module.css";
import CrossOutButton from "./cross-out-button";

import type {IndicatorContent} from "./choice-indicator";
import type {CrossOutButtonProps} from "./cross-out-button";

export interface IndicatorProps {
    checked: boolean;
    children: React.ReactNode | React.ReactNode[];
    indicatorContent: IndicatorContent;
    isMultiSelect: boolean;
    showCorrectness?: "correct" | "wrong";
    updateChecked: (isChecked: boolean) => void;
    /**
     * The choice's cross-out button. Leave it out when cross-out is off.
     */
    crossOut?: CrossOutButtonProps;
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
    const crossOut = props.crossOut;
    const classes = [styles.choice]
        .concat(showCorrectness ? [styles["is-" + showCorrectness]] : [])
        .concat(crossOut ? [styles["has-cross-out"]] : [])
        .concat(crossOut?.crossedOut ? [styles["is-crossed-out"]] : [])
        .join(" ");
    const indicator = (
        <Indicator
            buttonRef={buttonRef}
            checked={props.checked}
            content={props.indicatorContent}
            shape={indicatorShape}
            showCorrectness={showCorrectness}
            updateChecked={props.updateChecked}
        />
    );

    if (!crossOut) {
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
                {indicator}
                {props.children}
            </li>
        );
    }

    /*
        With cross-out on, the click-to-select area and the cross-out button are
            siblings, so the cross-out button isn't nested inside an element
            that selects the choice when clicked.
        The click handler on the target <div> accommodates mouse users, as the
            <li> one does above.
     */
    return (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <li className={classes} role="listitem">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div className={styles["choice-target"]} onClick={clickHandler}>
                {indicator}
                {props.children}
            </div>
            <CrossOutButton {...crossOut} />
        </li>
    );
};

export default Choice;

// The title bar every perseus-mcp page shares: a dark bar, as the exercise
// editor's, with a way back, the page's title (its h1) and a line about it,
// and the page's own links or controls at its end.
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import arrowLeftIcon from "@phosphor-icons/core/regular/arrow-left.svg";
import * as React from "react";

import styles from "./page-header.module.css";

export function PageHeader({
    title,
    subtitle,
    back,
    end,
}: {
    title: string;
    /** A line under the title, such as what the page holds. */
    subtitle?: string;
    /** The page this one belongs to, such as the list of exercises. */
    back?: {href: string; label: string};
    /** Links or controls for the page, at the bar's end. */
    end?: React.ReactNode;
}) {
    return (
        <header className={styles.bar}>
            {back != null && (
                <a className={styles.back} href={back.href}>
                    <PhosphorIcon icon={arrowLeftIcon} aria-hidden={true} />
                    <span className={styles.hidden}>{back.label}</span>
                </a>
            )}
            <div className={styles.titles}>
                <Heading tag="h1" size="medium" className={styles.title}>
                    {title}
                </Heading>
                {subtitle != null && subtitle !== "" && (
                    <BodyText size="small" className={styles.subtitle}>
                        {subtitle}
                    </BodyText>
                )}
            </div>
            {end != null && <div className={styles.end}>{end}</div>}
        </header>
    );
}

/**
 * A link styled as a button on the bar: outlined, light on dark. `external`
 * opens it in a new tab, and says so to screen readers.
 */
export function BarLink({
    href,
    children,
    external = false,
}: {
    href: string;
    children: React.ReactNode;
    external?: boolean;
}) {
    return (
        <a
            className={styles.barLink}
            href={href}
            {...(external && {target: "_blank", rel: "noopener noreferrer"})}
        >
            {children}
            {external && (
                <span className={styles.hidden}> (opens in a new tab)</span>
            )}
        </a>
    );
}

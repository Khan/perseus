// "Changed 2 hours ago", for the pages that list drafts, exercises and
// diagrams.
import * as React from "react";

const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 365 * 24 * 60 * 60],
    ["month", 30 * 24 * 60 * 60],
    ["week", 7 * 24 * 60 * 60],
    ["day", 24 * 60 * 60],
    ["hour", 60 * 60],
    ["minute", 60],
];

/** How long ago `date` was, such as "2 hours ago" or "yesterday". */
export function sinceNow(date: Date, now: Date): string {
    const seconds = (date.getTime() - now.getTime()) / 1000;
    const format = new Intl.RelativeTimeFormat(undefined, {numeric: "auto"});
    for (const [unit, size] of UNITS) {
        if (Math.abs(seconds) >= size) {
            return format.format(Math.round(seconds / size), unit);
        }
    }
    return "just now";
}

/** The time, again every minute, so "changed 2 minutes ago" stays right. */
export function useNow(): Date {
    const [now, setNow] = React.useState(() => new Date());
    React.useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60_000);
        return () => clearInterval(timer);
    }, []);
    return now;
}

/** A `<time>` saying how long ago it was, with the date on hover. */
export function Ago({at, now}: {at: string; now: Date}) {
    return (
        <time dateTime={at} title={new Date(at).toLocaleString()}>
            {sinceNow(new Date(at), now)}
        </time>
    );
}

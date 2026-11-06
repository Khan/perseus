// Where a page's back arrow goes. Each page has a page it belongs to (the
// diagram page belongs to the images page, for one), so the arrow does the
// same thing however the page was opened: from a link Claude gave, a new tab
// or a bookmark. A link from another page can add `?from=<that page>`, and
// the arrow goes back there instead.

/** The page a back arrow goes to, and its name for screen readers. */
export type Back = {href: string; label: string};

/**
 * The page `?from=` names in `search`, if it's a page on this server: a path
 * with one leading `/`. Anything else (`//host`, a full URL) is ignored, so
 * a link can't send someone off the server.
 */
export function returnPath(search: string): string | null {
    const from = new URLSearchParams(search).get("from");
    if (from == null || !from.startsWith("/") || /^\/[/\\]/.test(from)) {
        return null;
    }
    return /[\\\s]/.test(from) ? null : from;
}

/** What a back arrow to `path` says, by the kind of page it is. */
export function backLabel(path: string): string {
    const pathname = path.split(/[?#]/)[0];
    if (pathname === "/") {
        return "Back to home";
    }
    if (pathname === "/exercises") {
        return "Back to all exercises";
    }
    if (pathname === "/images") {
        return "Back to all images";
    }
    if (pathname.startsWith("/exercises/")) {
        return "Back to the exercise";
    }
    if (pathname.startsWith("/graffiti/")) {
        return "Back to the diagram";
    }
    if (pathname.startsWith("/drafts/")) {
        return "Back to the draft";
    }
    return "Back";
}

/**
 * `href` with `?from=` naming the page at `location`, so the page it opens
 * comes back here. The page's own `from` is left out, so going back twice
 * goes up rather than round in a loop.
 */
export function withFrom(
    href: string,
    location: {pathname: string; search: string},
): string {
    const params = new URLSearchParams(location.search);
    params.delete("from");
    const query = params.toString();
    const here = location.pathname + (query === "" ? "" : `?${query}`);
    const [path, hash = ""] = href.split("#");
    const separator = path.includes("?") ? "&" : "?";
    return (
        `${path}${separator}from=${encodeURIComponent(here)}` +
        (hash === "" ? "" : `#${hash}`)
    );
}

/** Where the arrow goes: the `?from=` page if there is one, else `up`. */
export function backFor(up: Back, search: string): Back {
    const from = returnPath(search);
    return from == null ? up : {href: from, label: backLabel(from)};
}

/** `withFrom` for a link on the page now showing. */
export function linkFromHere(href: string): string {
    return withFrom(href, window.location);
}

import crypto from "node:crypto";

import {isModuleCssFile} from "./css-files";

/**
 * Generates the class name that a CSS module's local class compiles to.
 *
 * Vite calls this (as `css.modules.generateScopedName`) for every local class
 * in a `.module.css` file. The result is `perseus_` followed by 8 characters
 * of a SHA-256 hash of the stylesheet's path and the class name, so:
 *
 * - the same class in the same file always gets the same name, keeping builds
 *   reproducible.
 * - classes with the same name in different files don't collide.
 * - the `perseus_` prefix keeps the name from starting with a digit (which
 *   isn't a valid CSS identifier) and from colliding with a host page's
 *   classes.
 *
 * Base64 characters that aren't valid in a class name (`/`, `+`, `=`) are
 * replaced with `-`.
 *
 * @param name The class name as written in the stylesheet.
 * @param filename The stylesheet's path. Vite passes the module's absolute
 * file path.
 * @returns The scoped class name, or `name` unchanged when `filename` isn't a
 * CSS module.
 */
export function makeScopedClassName(name: string, filename: string) {
    if (!isModuleCssFile(filename)) {
        return name;
    }

    const hash = crypto
        .createHash("sha256")
        .update(`${filename}:${name}`)
        .digest("base64")
        .replace(/[/+=]/g, "-")
        .slice(0, 8);
    return `perseus_${hash}`;
}

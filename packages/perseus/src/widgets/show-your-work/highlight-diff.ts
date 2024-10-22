import {diff} from "fast-array-diff";

export const diffEquations = (ones: HTMLElement[], twos: HTMLElement[]) => {
    const mid = ones.findIndex((el) => el.textContent === "=");
    const tmid = twos.findIndex((el) => el.textContent === "=");
    if (mid === -1 || tmid === -1) return;
    const oneLeft = ones.slice(0, mid);
    const twoLeft = twos.slice(0, tmid);
    const oneRight = ones.slice(mid);
    const twoRight = twos.slice(tmid);
    diffNodes(oneLeft, twoLeft);
    diffNodes(oneRight, twoRight);
};

const diffNodes = (ones: HTMLElement[], twos: HTMLElement[]) => {
    const changes = diff(ones, twos, (one, two) => {
        if (
            one.textContent === two.textContent &&
            one.className === two.className
        ) {
            return true;
        }
        return false;
    });
    changes.added.forEach((added) => {
        const n = added as HTMLElement;
        n.classList.add("perseus-diff-added");
    });
};

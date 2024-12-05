type PolitenessLevel = "assertive" | "polite";

export function ariaLiveAnnounce(message: string, options?: {level?: PolitenessLevel}): void {
    const region = recreateAriaLiveRegion(options?.level ?? "polite")
    region.innerText = message
}

let currentAriaLiveRegion: HTMLDivElement | null = null
function recreateAriaLiveRegion(politenessLevel: PolitenessLevel): HTMLDivElement {
    if (currentAriaLiveRegion) {
        document.body.removeChild(currentAriaLiveRegion)
    }

    currentAriaLiveRegion = createAriaLiveRegion(politenessLevel)
    return currentAriaLiveRegion
}

function createAriaLiveRegion(politenessLevel: PolitenessLevel): HTMLDivElement {
    console.log("createAriaLiveRegion")
    const newRegion = document.createElement("div")
    newRegion.setAttribute("aria-live", politenessLevel)
    newRegion.classList.add("perseus-aria-live-region")
    return document.body.appendChild(newRegion)
}

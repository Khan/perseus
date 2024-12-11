import { AriaLivePolitenessLevel } from "./types"

export function ariaLiveAnnounce(message: string, options?: {level?: AriaLivePolitenessLevel}): void {
    const region = recreateAriaLiveRegion(options?.level ?? "polite")
    region.innerText = message
}

let currentAriaLiveRegion: HTMLDivElement | null = null
function recreateAriaLiveRegion(politenessLevel: AriaLivePolitenessLevel): HTMLDivElement {
    if (currentAriaLiveRegion) {
        document.body.removeChild(currentAriaLiveRegion)
    }

    currentAriaLiveRegion = createAriaLiveRegion(politenessLevel)
    return currentAriaLiveRegion
}

function createAriaLiveRegion(politenessLevel: AriaLivePolitenessLevel): HTMLDivElement {
    const newRegion = document.createElement("div")
    newRegion.setAttribute("aria-live", politenessLevel)
    newRegion.classList.add("perseus-aria-live-region")
    // taken from a11y.srOnly
    newRegion.style.border = "0"
    newRegion.style.height = "1"
    newRegion.style.margin = "-1"
    newRegion.style.overflow = "hidden"
    newRegion.style.padding = "0"
    newRegion.style.position = "absolute"
    newRegion.style.width = "1"
    return document.body.appendChild(newRegion)
}

import {useEffect, useState} from "react";

/**
 * Custom hook to detect active scrolling on mobile devices only.
 * Only activates when viewport width is 767px or less.
 * This is a workaround for the inconsistent behavior between iOS and Android.
 * iOS has an issue on showing the hover state of choices during scrolling or
 * tap and drag, while Android does not have this issue. By adding the event
 * listeners only on mobile devices, we can provide a consistent experience.
 *
 * This hook helps improve the mobile scrolling experience by:
 * - Hiding choice dividers during active scrolling (cleaner scroll)
 * - Showing enhanced dividers on tap/selection (better feedback)
 *
 * @param scrollElementId - The ID of the scrollable element to monitor
 * @returns boolean - true when actively scrolling (dividers will be hidden)
 */
export function useMobileScrollDetection(scrollElementId: string): boolean {
    const [isActivelyScrolling, setIsActivelyScrolling] = useState(false);

    useEffect(() => {
        // Only activate scroll detection on mobile devices (viewport width <= 767px)
        if (window.innerWidth > 767) {
            return;
        }

        // Get the scrollable element using the provided ID
        const scrollElement = document.getElementById(scrollElementId);

        if (!scrollElement) {
            return;
        }

        let scrollTimer: ReturnType<typeof setTimeout>;

        const handleScrollStart = () => {
            setIsActivelyScrolling(true);
            clearTimeout(scrollTimer);
        };

        const handleScrollEnd = () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                setIsActivelyScrolling(false);
            }, 150); // Small delay to detect when scrolling truly stops
        };

        // Add event listeners with passive flag for better performance
        scrollElement.addEventListener("scroll", handleScrollStart, {
            passive: true,
        });
        scrollElement.addEventListener("scroll", handleScrollEnd, {
            passive: true,
        });
        scrollElement.addEventListener("touchend", handleScrollEnd, {
            passive: true,
        });

        return () => {
            // Cleanup event listeners and timer
            scrollElement.removeEventListener("scroll", handleScrollStart);
            scrollElement.removeEventListener("scroll", handleScrollEnd);
            scrollElement.removeEventListener("touchend", handleScrollEnd);
            clearTimeout(scrollTimer);
        };
    }, [scrollElementId]);

    return isActivelyScrolling;
}

import {useRef} from "react";

export function useThrottle(callback: () => void, interval: number = 500) {
    const lastRun = useRef(Date.now());

    return function () {
        if (Date.now() - lastRun.current >= interval) {
            callback();
            lastRun.current = Date.now();
        }
    };
}

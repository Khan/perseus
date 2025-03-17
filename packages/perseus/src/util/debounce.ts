export const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    delay: number,
): ((...args: T) => void) => {
    let timer: number | null = null;
    return (...args: T) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (timer) {
            clearTimeout(timer);
        }
        timer = window.setTimeout(() => {
            func(...args);
        }, delay);
    };
};

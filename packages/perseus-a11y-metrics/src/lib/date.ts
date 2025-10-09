export function urlSafeDate(date: Date): string {
    const zeropad = (n: number) => `${n}`.padStart(2, "0");
    const yyyy = date.getUTCFullYear();
    const mm = zeropad(date.getUTCMonth() + 1); // month is zero-indexed
    const dd = zeropad(date.getUTCDate());
    const hh = zeropad(date.getUTCHours());
    const mi = zeropad(date.getUTCMinutes());
    const ss = zeropad(date.getUTCSeconds());
    return `${yyyy}-${mm}-${dd}-${hh}${mi}${ss}`;
}

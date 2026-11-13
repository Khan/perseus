export function isCssFile(name: string): boolean {
    return name.endsWith(".css");
}

export function isModuleCssFile(name: string): boolean {
    return name.endsWith(".module.css");
}

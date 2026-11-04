// Vite imports a file's text with `?raw`.
declare module "*.svg?raw" {
    const text: string;
    export default text;
}

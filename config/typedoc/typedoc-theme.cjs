// @ts-check
const {DefaultTheme, DefaultThemeRenderContext} = require("typedoc");

class PerseusThemeRenderContext extends DefaultThemeRenderContext {
    // Override partials here to customize rendering.
    // For now this is a faithful recreation of the default theme.
}

class PerseusTheme extends DefaultTheme {
    /**
     * @param {import("typedoc").Renderer} renderer
     */
    constructor(renderer) {
        super(renderer);
        this.ContextClass = PerseusThemeRenderContext;
    }
}

/**
 * @param {import("typedoc").Application} app
 */
function load(app) {
    app.renderer.defineTheme("perseus", PerseusTheme);
}

module.exports = {load};

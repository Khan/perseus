import type {RenderedDiagram} from "../domain/graffiti/diagram";

/** Runs a diagram's script and returns what it draws. */
export interface GraffitiRenderer {
    /** @throws GraffitiRenderError when the script fails or draws nothing. */
    render(source: string): Promise<RenderedDiagram>;
}

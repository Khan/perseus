import type {Diagram} from "../domain/graffiti/diagram";

export type DiagramListener = (diagram: Diagram) => void;

/** Tells interested parties (such as open previews) when a diagram changes. */
export interface GraffitiFeed {
    /**
     * Calls `listener` with each new revision of the diagram, until the
     * returned function is called.
     */
    subscribe(graffitiId: string, listener: DiagramListener): () => void;
}

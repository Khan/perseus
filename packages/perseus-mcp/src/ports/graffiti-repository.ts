import type {Diagram} from "../domain/graffiti/diagram";

/** Where diagrams are kept, every revision of each. */
export interface GraffitiRepository {
    /** The diagram's latest revision. */
    get(graffitiId: string): Diagram | undefined;
    getRevision(graffitiId: string, revision: number): Diagram | undefined;
    /** Every diagram's latest revision, most recently changed first. */
    list(): Diagram[];
    /** Adds a revision; earlier ones are kept. */
    save(diagram: Diagram): void;
}

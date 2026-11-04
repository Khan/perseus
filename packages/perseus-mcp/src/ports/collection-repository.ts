import type {Collection} from "../domain/collections/collection";

/** Where collections are kept between tool calls and restarts. */
export interface CollectionRepository {
    get(collectionId: string): Collection | undefined;
    /** Every collection, most recently changed first. */
    list(): Collection[];
    /** Adds the collection, or replaces the one with the same id. */
    save(collection: Collection): void;
}

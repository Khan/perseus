import path from "node:path";
import {inflateRawSync} from "node:zlib";

/** Why a zip couldn't be read, for a person to see. */
export class ZipReadError extends Error {}

/** A .json file a zip held. */
export type ZipJsonFile = {fileName: string; text: string};

// Signatures and the offsets this reader uses within each record.
// https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT
const END_OF_CENTRAL_DIRECTORY = 0x06054b50;
const CENTRAL_DIRECTORY_ENTRY = 0x02014b50;
const LOCAL_FILE_HEADER = 0x04034b50;
const STORED = 0;
const DEFLATED = 8;

/**
 * The .json files in a zip, such as several exercises' exports zipped
 * together, read from its central directory: stored or deflated entries,
 * without Zip64 or encryption. Folders, macOS's `__MACOSX` copies and
 * hidden files are left out. `maxBytes` caps the files' unzipped size in
 * all, so a small zip can't unzip to fill memory.
 *
 * @throws ZipReadError
 */
export function jsonFilesInZip(
    zip: Buffer,
    {maxBytes}: {maxBytes: number},
): ZipJsonFile[] {
    const end = findEndOfCentralDirectory(zip);
    const count = zip.readUInt16LE(end + 10);
    let offset = zip.readUInt32LE(end + 16);
    const files: ZipJsonFile[] = [];
    let total = 0;

    for (let i = 0; i < count; i++) {
        if (zip.readUInt32LE(offset) !== CENTRAL_DIRECTORY_ENTRY) {
            throw new ZipReadError("The zip's file list is damaged.");
        }
        const flags = zip.readUInt16LE(offset + 8);
        const method = zip.readUInt16LE(offset + 10);
        const compressedSize = zip.readUInt32LE(offset + 20);
        const size = zip.readUInt32LE(offset + 24);
        const nameLength = zip.readUInt16LE(offset + 28);
        const extraLength = zip.readUInt16LE(offset + 30);
        const commentLength = zip.readUInt16LE(offset + 32);
        const localOffset = zip.readUInt32LE(offset + 42);
        const name = zip.toString(
            "utf8",
            offset + 46,
            offset + 46 + nameLength,
        );
        offset += 46 + nameLength + extraLength + commentLength;

        if (!isJsonFile(name)) {
            continue;
        }
        if ((flags & 1) !== 0) {
            throw new ZipReadError(`${name} is encrypted.`);
        }
        total += size;
        if (total > maxBytes) {
            throw new ZipReadError(
                `The zip's .json files are larger than ` +
                    `${Math.round(maxBytes / 1_000_000)} MB unzipped.`,
            );
        }
        const data = entryData(zip, localOffset, compressedSize, name);
        files.push({
            fileName: path.posix.basename(name),
            text: unzipEntry(data, method, size, name).toString("utf8"),
        });
    }
    return files;
}

function isJsonFile(name: string): boolean {
    const base = path.posix.basename(name);
    return (
        name.toLowerCase().endsWith(".json") &&
        !name.startsWith("__MACOSX/") &&
        !base.startsWith(".")
    );
}

/** The end of central directory record, which a comment may follow. */
function findEndOfCentralDirectory(zip: Buffer): number {
    // The record is 22 bytes, then a comment of at most 65,535.
    const earliest = Math.max(0, zip.length - 22 - 0xffff);
    for (let i = zip.length - 22; i >= earliest; i--) {
        if (zip.readUInt32LE(i) === END_OF_CENTRAL_DIRECTORY) {
            return i;
        }
    }
    throw new ZipReadError("This isn't a zip file.");
}

function entryData(
    zip: Buffer,
    localOffset: number,
    compressedSize: number,
    name: string,
): Buffer {
    if (zip.readUInt32LE(localOffset) !== LOCAL_FILE_HEADER) {
        throw new ZipReadError(`The zip's copy of ${name} is damaged.`);
    }
    const nameLength = zip.readUInt16LE(localOffset + 26);
    const extraLength = zip.readUInt16LE(localOffset + 28);
    const start = localOffset + 30 + nameLength + extraLength;
    return zip.subarray(start, start + compressedSize);
}

function unzipEntry(
    data: Buffer,
    method: number,
    size: number,
    name: string,
): Buffer {
    if (method === STORED) {
        return data;
    }
    if (method === DEFLATED) {
        try {
            return inflateRawSync(data, {maxOutputLength: Math.max(size, 1)});
        } catch (e) {
            throw new ZipReadError(`Couldn't unzip ${name}: ${String(e)}`);
        }
    }
    throw new ZipReadError(
        `${name} is compressed in a way this reader doesn't know ` +
            `(method ${method}); zip it with the usual "deflate".`,
    );
}

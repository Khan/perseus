#!/usr/bin/env -S node -r @swc-node/register
/* eslint-disable no-console */
import crypto from "crypto";
import fs from "fs";
import stream from "stream";
import util from "util";

import fg from "fast-glob";

async function run(args: ReadonlyArray<string>) {
    const globPattern = args[2];
    console.log("Glob:", globPattern);

    let fileCount = 0;
    const result = crypto.createHash("sha256");
    for (const f of await fg(globPattern)) {
        // console.log(`  ${f}`);
        fileCount++;

        const hash = crypto.createHash("sha256");
        const pipeline = util.promisify(stream.pipeline);
        await pipeline(fs.createReadStream(f), hash);

        result.write(hash.digest());
    }

    console.log(
        `Processed ${fileCount.toLocaleString("en-us")} file${fileCount === 1 ? "" : "s"} --> ${result.digest("hex")}`,
    );
}

run(process.argv);

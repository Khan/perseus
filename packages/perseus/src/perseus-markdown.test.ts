import PerseusMarkdown from "./perseus-markdown";

describe("PerseusMarkdown.parse()", () => {
    it("parses Crowdin IDs when isJipt is true", () => {
        const content =
            "crwdns4137066:0crwdne4137066:0\n\ncrwdns4137067:0crwdne4137067:0";

        const result = PerseusMarkdown.parse(content, {isJipt: true});

        expect(result).toEqual([
            {
                type: "crowdinId",
                id: "crwdns4137066:0crwdne4137066:0",
            },
            {
                type: "crowdinId",
                id: "crwdns4137067:0crwdne4137067:0",
            },
        ]);
    });

    it("ignores trailing newlines when isJipt is true", () => {
        const content = "crwdns4137066:0crwdne4137066:0\n\n";

        const result = PerseusMarkdown.parse(content, {isJipt: true});

        expect(result).toEqual([
            {
                type: "crowdinId",
                id: "crwdns4137066:0crwdne4137066:0",
            },
        ]);
    });
});

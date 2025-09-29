export function getPublishedContentVersion(locale: string): Promise<string> {
    return fetch(
        `https://www.khanacademy.org/_fastly/published-content-version/${locale}`,
    )
        .then((response) => response.json())
        .then((data) => data.publishedContentVersion);
}

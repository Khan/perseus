export const randomLetter = (): string => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const emojis = ["🍇", "🍈", "🍌"];
    const japaneseCharacters = ["ツ", "デ", "ト", "ド", "ナ", "ぁ", "あ"];
    const characters = alphabet.concat(emojis).concat(japaneseCharacters);
    const letter = randomInteger(0, characters.length - 1);
    return characters[letter];
};

export const randomWord = (): string => {
    // words are 3 - 20 characters
    const numLetters = randomInteger(3, 11);
    return arrayOfLength(numLetters).map(randomLetter).join("");
};

export const randomSentence = (maxWords: number): string => {
    // return "abcd";

    const numWords = randomInteger(5, maxWords); // 5 - 105 words
    return arrayOfLength(numWords).map(randomWord).join(" ");
};

export const randomBoolean = (rateTrue?: number): boolean => {
    const threshold = rateTrue || 0.5;
    return Math.random() < threshold;
};

export const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};

export const arrayOfLength = (length: number): number[] => {
    return Array.from(Array(length).keys());
};

export function randomElement<T>(items: Array<T>): T | undefined {
    if (items.length > 0) {
        return items[randomInteger(0, items.length - 1)];
    }
    return undefined;
}

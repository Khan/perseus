// Helpers to generate random test data for widgets

// Returns a random letter inclusive of emoji and japanese characters
export const randomLetter = (): string => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const emojis = ["🍇", "🍈", "🍌"];
    const japaneseCharacters = ["ツ", "デ", "ト", "ド", "ナ", "ぁ", "あ"];
    const characters = alphabet.concat(emojis).concat(japaneseCharacters);
    const letter = randomInteger(0, characters.length - 1);
    return characters[letter];
};

// Returns a random word 3-20 characters long composed of the random letter function
export const randomWord = (): string => {
    // words are 3 - 20 characters
    const numLetters = randomInteger(3, 11);
    return arrayOfLength(numLetters).map(randomLetter).join("");
};

// Returns a random sentence of a specified number of words, using the random word function
export const randomSentence = (maxWords: number): string => {
    const numWords = randomInteger(5, Math.max(maxWords, 5));
    return arrayOfLength(numWords).map(randomWord).join(" ");
};

// generates a boolean. 50/50 unless rateTrue is specified
export const randomBoolean = (rateTrue?: number): boolean => {
    let threshold = rateTrue;
    if (threshold == null) {
        threshold = 0.5;
    }
    return Math.random() < threshold;
};

// generates an integer inclusive of the specified min and max
export const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};

// A helper to create an array of a certain length.
export const arrayOfLength = (length: number): number[] => {
    return Array.from(Array(length).keys());
};

// Returns a random element from a provided list
export function randomElement<T>(items: Array<T>): T | undefined {
    if (items.length > 0) {
        return items[randomInteger(0, items.length - 1)];
    }
    return undefined;
}

// @flow
import Rule from "../rule.js";

export default (Rule.makeRule({
    name: "profanity",
    // This list could obviously be expanded a lot, but I figured we
    // could start with https://en.wikipedia.org/wiki/Seven_dirty_words
    pattern: /\b(shit|piss|fuck|cunt|cocksucker|motherfucker|tits)\b/i,
    message: "Avoid profanity",
}): Rule);

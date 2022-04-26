/**
 * 
 * @param input The input string to search in
 * @param searchValue The RegExp to use for search
 * @param replacer The function that is executed on every match
 * @param maxMatches Limit the maximum amount of matches, 0 for no limit
 * @param cacheMatchResults Avoid executing the replacer function multiple times for the same matched string by "caching" the result, default false
 * @returns 
 */
const smartReplace = async (
    input: string,
    searchValue: RegExp,
    replacer: (match: string) => Promise<string>,
    options?: {
        maxMatches?: number,
        cacheMatchResults?: boolean,
    }
): Promise<string> => {
    const matches: [number, string][] = [];

    let match: RegExpExecArray|null;
    while ((match = searchValue.exec(input)) != null && (!options?.maxMatches || matches.length < options?.maxMatches)) {
        matches.push([match.index, match[0].toString()]);
    }

    let offset = 0;
    const resultCache: { [key: string]: string } = {};
    for (const m of matches) {
        const newVal = resultCache[m[1]] ?? await replacer(m[1]);
        if (options?.cacheMatchResults && typeof resultCache[m[1]] == 'undefined') resultCache[m[1]] = newVal;

        input = input.slice(0, m[0] + offset) + newVal + input.slice(m[0] + m[1].length + offset);
        offset += newVal.length - m[1].length;
    }

    return input;
}

export { smartReplace };

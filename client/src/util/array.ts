/**
 * Split an array in array of pairs [1, 2, 3, 4] -> [[1, 2], [3, 4]]
 *
 * @param array input array
 * @returns  array of tuples
 */
// eslint-disable-next-line import/prefer-default-export
export function splitPair<T>(array: readonly T[]): [T, T][] {
    return array.reduce((result, _value, index, arr) => {
        const s = arr.slice(index, index + 2) as [T, T];
        if (index % 2 === 0) result.push(s);
        return result;
    }, [] as [T, T][]);
}

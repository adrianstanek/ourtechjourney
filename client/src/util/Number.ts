/**
 * Clamps a number between two values
 * @param actual Your current value
 * @param min lowest possible value
 * @param max highhest possible value
 * @returns a number between min and max
 */
export function clamp(actual: number, min: number, max: number): number {
    return Math.min(Math.max(actual, min), max);
}

/**
 *
 * Compares two floating point numbers around
 * a tolerance number
 *
 * **DO NOT USE `Number.EPSILON`!** It's usually way too small!
 * Use a tolerance number that makes sense for your use case!
 *
 * @param a 1st number to compare
 * @param b 2nd number to compare
 * @param epsilon tolerance
 * @returns true if a and b should be considirered equal based on your tolerance
 */
export function epsilonCompare(a: number, b: number, epsilon: number): boolean {
    return Math.abs(a - b) < epsilon;
}

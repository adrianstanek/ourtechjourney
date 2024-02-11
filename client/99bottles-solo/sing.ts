export function sing() {
    const passBeerAround = 'Take one down and pass it around';
    const buyMoreBeer = 'Go to the store and buy some more';
    const verse = (bottles: string, bottlesAfter: string, action: string) =>
        `${bottles} of beer on the wall, ${bottles.toLowerCase()} of beer.\n${action}, ${bottlesAfter} of beer on the wall.`;
    const verses = Array(97)
        .fill('')
        .map((_, k) => verse(`${99 - k} bottles`, `${99 - k - 1} bottles`, passBeerAround));

    const twoBottle = verse('2 bottles', '1 bottle', passBeerAround);
    const oneBottle = verse('1 bottle', 'no more bottles', passBeerAround);
    const bridge = verse('No more bottles', '99 bottles', buyMoreBeer);

    verses.push(twoBottle, oneBottle, bridge);
    return verses.join('\n\n');
}

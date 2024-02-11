export function sing() {
    const verses = Array(97)
        .fill('')
        .map((_, k) => {
            const nr = 99 - k;
            return `${nr} bottles of beer on the wall, ${nr} bottles of beer.\nTake one down and pass it around, ${nr - 1} bottles of beer on the wall.`;
        });
    const twoBottle =
        '2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.';
    const oneBottle =
        '1 bottle of beer on the wall, 1 bottle of beer.\nTake one down and pass it around, no more bottles of beer on the wall.';
    const bridge =
        'No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.';

    verses.push(twoBottle, oneBottle, bridge);
    return verses.join('\n\n');
}

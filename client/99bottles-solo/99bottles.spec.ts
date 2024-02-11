import { FULL_LYRICS } from './FULL_LYRICS';

function Lyrics(text: string) {
    return {
        zero: () => text.split('\n\n').at(-1)?.split('\n') || [],
    };
}

function sing() {
    return '\n\nNo more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.';
}

describe('99 Bottles of Beer lyrics - song', () => {
    it.todo('is structured with a repeating VERSE form');
    it.todo('has VERSES with two SENTENCES');
    it.todo('the 1st SENTENCE has the BOTTLES SECTION and its RHYME');
    it.todo('the 2nd SENTENCE has the ACTION and NEW BOTTLES SECTION');
    it.todo("refers to a specific number of bottles in each VERSE's 1st SENTENCE");
    it.todo('decrements the number of bottles in the 2nd SENTENCE');
    it.todo("repeats the previous verse's 2nd SENTENCE in the following VERSE's 1st SENTENCE");

    it.todo('styles the zero bottle BOTTLES SECTION as text: "no more bottles"');
    it.todo('all non-zero VERSES decrement the number of bottles in the 2nd SENTENCE');
    it.todo('DETAIL: each SENTENCE starts uppercase');
    it.todo('DETAIL: VERSES are separated by an additional newline');

    it('styles the zero bottle ACTION with a special bridge section', () => {
        const zeroVerse1stSentence = Lyrics(sing()).zero()[0];
        expect(zeroVerse1stSentence).toMatch(
            'No more bottles of beer on the wall, no more bottles of beer.'
        );
    });
    it('the last VERSE with zero bottles finishes with 99 bottles in its 2nd sentence.', () => {
        const zeroVerse2ndSentence = Lyrics(sing()).zero()[1];
        expect(zeroVerse2ndSentence).toMatch(
            'Go to the store and buy some more, 99 bottles of beer on the wall.'
        );
    });

    it.skip('Full lyrics text should match when formatted nicely', () => {
        expect(sing()).toMatch(FULL_LYRICS);
    });
});

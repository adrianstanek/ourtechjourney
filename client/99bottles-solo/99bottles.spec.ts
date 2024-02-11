import { FULL_LYRICS } from './FULL_LYRICS';
import { sing } from './sing';

type VERSE = [string, string];

class NNBottlesLyrics {
    constructor(private text: string) {}

    zero() {
        return this.at(-1);
    }

    at(idx: number) {
        return (this.text.split('\n\n').at(idx)?.split('\n') || ['', '']) as VERSE;
    }
}

const Lyrics = (text: string) => new NNBottlesLyrics(text);

describe('99 Bottles of Beer lyrics - song', () => {
    it("repeats the previous VERSE's 2nd SENTENCE OUTRO in the following VERSE's 1st SENTENCE INTRO", () => {
        const [, outro] = Lyrics(sing()).at(0)[1].split(', ');
        const [intro = '?'] = Lyrics(sing()).at(1)[0].split(', ');
        expect(outro).toContain(intro.toLowerCase());
    });

    it('has 99 verses', () => {
        const lyrics = Lyrics(sing());
        expect(lyrics.at(99)[0]).toContain('on the wall');
    });

    it.each([0, 1, -1])(
        'the 1st SENTENCE has the BOTTLES SECTION and its matching RHYME (%d)',
        (verseAt) => {
            const verse1stSentence = Lyrics(sing()).at(verseAt)[0];
            const firstSentenceStructure = /(.+?) on the wall, (.+)\./gi;
            expect(verse1stSentence).toMatch(firstSentenceStructure);
            const parts = verse1stSentence.split(' on the wall, ') as VERSE;
            expect(parts[1]).toContain(parts[0].toLowerCase());
        }
    );

    it('styles the zero bottle BOTTLES SECTION as text: "no more bottles"', () => {
        const zeroVerse1stSentence = Lyrics(sing()).zero()[0];
        expect(zeroVerse1stSentence).toContain('no more bottles');
    });

    it('styles the zero bottle ACTION with a special bridge section', () => {
        const zeroVerse2ndSentence = Lyrics(sing()).zero()[1];
        expect(zeroVerse2ndSentence).toContain('Go to the store and buy some more');
    });
    it('the last VERSE with zero bottles finishes with 99 bottles in its 2nd sentence.', () => {
        const zeroVerse2ndSentence = Lyrics(sing()).zero()[1];
        expect(zeroVerse2ndSentence).toContain('99 bottles of beer on the wall');
    });

    it.skip('Full lyrics text should match when formatted nicely', () => {
        expect(sing()).toMatch(FULL_LYRICS);
    });
});

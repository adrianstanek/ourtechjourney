import junit.framework.TestCase;

import java.util.Arrays;

public class NBottlesOfBeerOnTheWallTest extends TestCase {

    private static String[] lyricsForBottlesOfBeer(final int numberOfBottlesOfBeer) {
        return new String[0];
    }

    public void testZeroBottlesOfBeer() {
        assertEqualsArrayValues(new String[]{
                        "No more bottles of beer on the wall, no more bottles of beer.",
                        "Go to the store and buy some more, 99 bottles of beer on the wall."},
                lyricsForBottlesOfBeer(0));
    }

    private static void assertEqualsArrayValues(final String[] expectedLines, final String[] actualLines) {
        assertEquals(Arrays.asList(expectedLines), Arrays.asList(actualLines));
    }

}

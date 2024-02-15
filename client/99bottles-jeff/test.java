import junit.framework.TestCase;

import java.util.Arrays;
import java.util.stream.Collectors;

public class NBottlesOfBeerOnTheWallTest extends TestCase {

    private static String[] lyricsForBottlesOfBeer(final int numberOfBottlesOfBeer) {
        return new String[]{
                "No more bottles of beer on the wall, no more bottles of beer.",
                "Go to the store and buy some more, 99 bottles of beer on the wall."};
    }

    public void testZeroBottlesOfBeer() {
        assertEqualsArrayValues(new String[]{
                        "No more bottles of beer on the wall, no more bottles of beer.",
                        "Go to the store and buy some more, 99 bottles of beer on the wall."},
                lyricsForBottlesOfBeer(0));
    }

    public void testOneBottleOfBeer() {
        assertEqualsArrayValues(new String[]{
                        "1 bottle of beer on the wall, 1 bottle of beer.",
                        "Take one down and pass it around, no more bottles of beer on the wall.",
                        "",
                        "No more bottles of beer on the wall, no more bottles of beer.",
                        "Go to the store and buy some more, 99 bottles of beer on the wall."
                },
                lyricsForBottlesOfBeer(1));
    }

    private static void assertEqualsArrayValues(final String[] expectedLines, final String[] actualLines) {
        final var expectedAsString = Arrays.stream(expectedLines).collect(Collectors.joining(System.lineSeparator()));
        final var actualAsString = Arrays.stream(actualLines).collect(Collectors.joining(System.lineSeparator()));
        assertEquals(expectedAsString, actualAsString);
    }

}

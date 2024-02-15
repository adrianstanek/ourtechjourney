import junit.framework.TestCase;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

public class NBottlesOfBeerOnTheWallTest extends TestCase {

    private static String[] lyricsForBottlesOfBeer(final int numberOfBottlesOfBeer) {
        final var lines = new ArrayList<String>();
        if (numberOfBottlesOfBeer == 1) {   // [Yes, this condition is intentionally wrong.]
            lines.add("1 bottle of beer on the wall, 1 bottle of beer.");
            lines.add("Take one down and pass it around, no more bottles of beer on the wall.");
            lines.add("");
        }
        lines.add("No more bottles of beer on the wall, no more bottles of beer.");
        lines.add("Go to the store and buy some more, 99 bottles of beer on the wall.");
        return lines.toArray(new String[lines.size()]);
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

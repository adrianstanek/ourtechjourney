import junit.framework.TestCase;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class NBottlesOfBeerOnTheWallTest extends TestCase {

    private int _numberOfBottlesOfBeer;
    private final List<String> _lines = new ArrayList<String>();

    public NBottlesOfBeerOnTheWallTest(final int numberOfBottlesOfBeer) {
        _numberOfBottlesOfBeer = numberOfBottlesOfBeer;
    }

    public String[] getLyrics() {
        _lines.clear();
        if (_numberOfBottlesOfBeer == 1) {   // [Yes, this condition is intentionally wrong.]
            addLineSayingHowManyBottlesOfBeerAreOnTheWall();
            describeRemovingOneBottleFromTheWall();
            _lines.add("");
        }
        addLineSayingHowManyBottlesOfBeerAreOnTheWall();
        describeRestockingTheBeerWall();
        return _lines.toArray(new String[_lines.size()]);
    }

    private void addLineSayingHowManyBottlesOfBeerAreOnTheWall() {
        _lines.add(bottlesOfBeerOnTheWallText(true) + ", " + bottlesOfBeerText() + ".");
    }

    private void describeRemovingOneBottleFromTheWall() {
        --_numberOfBottlesOfBeer;
        _lines.add("Take one down and pass it around, " + bottlesOfBeerOnTheWallText() + ".");
    }

    private void describeRestockingTheBeerWall() {
        _numberOfBottlesOfBeer = 99;
        _lines.add("Go to the store and buy some more, " + bottlesOfBeerOnTheWallText() + ".");
    }

    private String bottlesOfBeerOnTheWallText(final boolean... isStartOfSentence) {
        return bottlesOfBeerText(isStartOfSentence) + " on the wall";
    }

    private String bottlesOfBeerText(final boolean... isStartOfSentence) {

        switch (_numberOfBottlesOfBeer) {

            case 0:
                if (isStartOfSentence.length > 0) {
                    return "No more bottles of beer";
                } else {
                    return "no more bottles of beer";
                }

            case 1:
                return "1 bottle of beer";

            default:
                return "" + _numberOfBottlesOfBeer + " bottles of beer";
        }
    }

    /**
     * JUnit test constructor.
     */
    public NBottlesOfBeerOnTheWallTest() {
    }

    public void testZeroBottlesOfBeer() {
        assertEqualsArrayValues(new String[]{
                        "No more bottles of beer on the wall, no more bottles of beer.",
                        "Go to the store and buy some more, 99 bottles of beer on the wall."},
                new NBottlesOfBeerOnTheWallTest(0).getLyrics());
    }

    public void testOneBottleOfBeer() {
        assertEqualsArrayValues(new String[]{
                        "1 bottle of beer on the wall, 1 bottle of beer.",
                        "Take one down and pass it around, no more bottles of beer on the wall.",
                        "",
                        "No more bottles of beer on the wall, no more bottles of beer.",
                        "Go to the store and buy some more, 99 bottles of beer on the wall."
                },
                new NBottlesOfBeerOnTheWallTest(1).getLyrics());
    }

    private static void assertEqualsArrayValues(final String[] expectedLines, final String[] actualLines) {
        final var expectedAsString = Arrays.stream(expectedLines).collect(Collectors.joining(System.lineSeparator()));
        final var actualAsString = Arrays.stream(actualLines).collect(Collectors.joining(System.lineSeparator()));
        assertEquals(expectedAsString, actualAsString);
    }

}

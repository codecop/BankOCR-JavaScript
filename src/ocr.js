/**
 * This is a single digit, containing a number of segments. It can compare itself.
 */
class Digit {

    constructor(segments) {
        this.segments = segments;
    }

    isEqual(other) {
        for (let row = 0; row < this.segments.length; ++row) {
            if (this.segments[row] !== other.segments[row])
                return false;
        }
        return true;
    }

    width() {
        return this.segments[0].length;
    }

    height() {
        return this.segments.length;
    }

}

/**
 * This is a container for a number of digits that we want to identify.
 */
class Numerals {

    constructor() {
        this.digits = [
            new Digit([' _  ',
                '| | ',
                '|_| ',
                '    ']),
            new Digit(['    ',
                '  | ',
                '  | ',
                '    ']),
            new Digit([' _  ',
                ' _| ',
                '|_  ',
                '    ']),
            new Digit([' _  ',
                ' _| ',
                ' _| ',
                '    ']),
            new Digit(['    ',
                '|_| ',
                '  | ',
                '    ']),
            new Digit([' _  ',
                '|_  ',
                ' _| ',
                '    ']),
            new Digit([' _  ',
                '|_  ',
                '|_| ',
                '    ']),
            new Digit([' _  ',
                '  | ',
                '  | ',
                '    ']),
            new Digit([' _  ',
                '|_| ',
                '|_| ',
                '    ']),
            new Digit([' _  ',
                '|_| ',
                ' _| ',
                '    '])];
    }

    identify(digit) {
        for (let numeral = 0; numeral < this.digits.length; ++numeral) {
            if (this.digits[numeral].isEqual(digit)) {
                return numeral;
            }
        }
        return -1;
        // if we do not want the marker we need to return a result or accept two lambdas.
    }

    digitWidth() {
        return this.digits[0].width();
    }

    digitHeight() {
        return this.digits[0].height();
    }

}

/**
 * Encapsulates logic to build the Account Number representation including marker.
 */
class AccountNumberBuilder {

    constructor() {
        this.numbers = "";
        this.isIllegal = false;
    }

    setNextDigitTo(numeral) {
        this.numbers += numeral;
    }

    setNextDigitToUnknown() {
        this.numbers += "?";
        this.isIllegal = true;
    }

    toString() {
        return `${this.numbers} ${this._marker()}`;
    }

    _marker() {
        if (this.isIllegal) {
            return "ILL";
        } else {
            return "   ";
        }
    }

}

class Input {

    constructor(allLines, digitWidth, lineHeight) {
        this.allLines = allLines;
        this.digitWidth = digitWidth;
        this.lineHeight = lineHeight;
        this.i = 0;
    }

    hasNext() {
        return this.i < this.allLines.length;
    }

    nextLine() {
        const lines = [];
        for (let row = 0; row < this.lineHeight; ++row) {
            lines.push(this.allLines[this.i + row]);
        }

        this.i += this.lineHeight;

        return new Line(this.digitWidth, lines);
    }

}

/**
 * A line of the Input which is a series of digits.
 */
class Line {

    constructor(digitWidth, lines) {
        this.digitWidth = digitWidth;
        this.lines = lines;
    }

    getDigitAt(pos) {
        const digitStartPos = pos * this.digitWidth;

        const segments = [];
        for (let row = 0; row < this.lines.length; ++row) {
            const segment = this.lines[row].substring(digitStartPos, digitStartPos + this.digitWidth);
            segments.push(segment);
        }

        return new Digit(segments);
    }
}

class Ocr {

    /**
     * @param {string[]} lines 
     * @returns {string[]}
     */
    static parse(lines) {
        /** @type {string[]} */
        const result = [];

        const numerals = new Numerals();
        const input = new Input(lines, numerals.digitWidth(), numerals.digitHeight());
        while (input.hasNext()) {
            const line = input.nextLine();

            let work = new AccountNumberBuilder();
            for (let pos = 0; pos < 9; ++pos) {
                const digit = line.getDigitAt(pos);
                const numeral = numerals.identify(digit);
                if (numeral >= 0) {
                    work.setNextDigitTo(numeral);
                } else {
                    work.setNextDigitToUnknown();
                }
            }
            const x = work.toString();

            result.push(x);
        }
        return result;
    }
}

module.exports = {
    Ocr
};

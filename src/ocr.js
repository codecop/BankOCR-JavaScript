/**
 * This is a single digit, containing a number of segments. It can compare itself.
 */
class Digit {

    constructor(segments) {
        this.segments = segments;
    }

    isEqual(other) {
        for (let y = 0; y < this.segments.length; ++y) {
            if (this.segments[y] !== other.segments[y]) {
                return false;
            }
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

/**
 * A document contains one or more lines.
 */
class Document {

    constructor(rawLines, digitWidth, digitHeight) {
        this.rawLines = rawLines;

        this.digitWidth = digitWidth;
        this.digitHeight = digitHeight;

        this.i = 0;
    }

    hasNext() {
        return this.i < this.rawLines.length;
    }

    nextLine() {
        const groupOfLines = [];
        for (let y = 0; y < this.digitHeight; ++y) {
            groupOfLines.push(this.rawLines[this.i]);
            this.i++;
        }

        return new Line(groupOfLines, this.digitWidth);
    }

}

/**
 * A line of the Input which is a series of digits.
 */
class Line {

    constructor(groupOfLines, digitWidth) {
        this.groupOfLines = groupOfLines;
        this.digitWidth = digitWidth;
    }

    getDigitAt(pos) {
        const digitStartPosX = pos * this.digitWidth;

        const segments = [];
        for (let y = 0; y < this.groupOfLines.length; ++y) {
            const segment = this.groupOfLines[y].substring(digitStartPosX, digitStartPosX + this.digitWidth);
            segments.push(segment);
        }

        return new Digit(segments);
    }
}

class Ocr {

    constructor() { 
        this.numerals = new Numerals();
    }

    parseAccountNumber(line) {
        let accountNumber = new AccountNumberBuilder();
        
        for (let pos = 0; pos < 9; ++pos) {
            const digit = line.getDigitAt(pos);
            const numeral = this.numerals.identify(digit);
            if (numeral >= 0) {
                accountNumber.setNextDigitTo(numeral);
            } else {
                accountNumber.setNextDigitToUnknown();
            }
        }

        return accountNumber.toString();
    }

    parseAccountNumbers(document) {
        /** @type {string[]} */
        const accountNumbers = [];
        while (document.hasNext()) {
            let accountNumber = this.parseAccountNumber(document.nextLine());
            accountNumbers.push(accountNumber);
        }
        return accountNumbers;
    }

    /**
     * @param {string[]} lines 
     * @returns {string[]}
     */
    static parse(lines) {
        /** @type {string[]} */
        const result = [];

        const numerals = new Numerals();
        const document = new Document(lines, numerals.digitWidth(), numerals.digitHeight());
        return new Ocr().parseAccountNumbers(document);
    }
}

module.exports = {
    Ocr
};

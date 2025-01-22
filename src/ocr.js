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

    constructor(lines) {
        this.lines = lines;
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
        const input = new Input(lines);

        for (let i = 0; i < lines.length; i += numerals.digitHeight()) {
            let work = new AccountNumberBuilder();
            for (let pos = 0; pos < 9; ++pos) {
                const x = numerals.digitWidth();
                const segments = [];
                for (let row = 0; row < numerals.digitHeight(); ++row) {
                    segments.push(lines[i + row].substring(x * pos, x * pos + x));
                }
                const digit = new Digit(segments);

                const numeral = numerals.identify(digit);
                if (numeral >= 0) {
                    work.setNextDigitTo(numeral);
                } else {
                    work.setNextDigitToUnknown();
                }
            }
            result.push(work.toString());
        }
        return result;
    }
}

module.exports = {
    Ocr
};

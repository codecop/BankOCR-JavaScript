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

}

const NUMERALS = [
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

class Ocr {

    /**
     * @param {string[]} lines 
     * @returns {string[]}
     */
    static parse(lines) {
        /** @type {string[]} */
        const result = [];
        for (let i = 0; i < lines.length; i += 4) {
            let work = new AccountNumberBuilder();
            for (let pos = 0; pos < 9; ++pos) {

                const segments = [];
                for (let row = 0; row < 4; ++row) {
                    segments.push(lines[i + row].substring(4 * pos, 4 * pos + 4));
                }
                const digit = new Digit(segments);

                let got1 = false;

                for (let numeral = 0; numeral <= 9; ++numeral) {
                    if (NUMERALS[numeral].isEqual(digit)) {
                        work.setNextDigitTo(numeral);
                        got1 = true;
                        break;
                    }
                }

                if (!got1) {
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

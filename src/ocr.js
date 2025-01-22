class Digit {

    constructor(lines) {
        this.lines = lines;
    }

    isEqual(other) {
        let ok = true;
        for (let row = 0; row < 4; ++row) {
            for (let col = 0; col < 4; ++col) {
                if (this.lines[row][col] !== other.lines[row][col])
                    ok = false;
            }
        }
        return ok;
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
                let got1 = false;

                let x = [];
                for (let row = 0; row < 4; ++row) {
                    x.push(lines[i + row].substring(4 * pos, 4 * pos + 4));
                }
                let y = new Digit(x);

                for (let numeral = 0; numeral <= 9; ++numeral) {
                    let ok = NUMERALS[numeral].isEqual(y);
                    if (ok) {
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

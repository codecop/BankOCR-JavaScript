
const NUMERALS = [
    [' _  ',
        '| | ',
        '|_| ',
        '    '],
    ['    ',
        '  | ',
        '  | ',
        '    '],
    [' _  ',
        ' _| ',
        '|_  ',
        '    '],
    [' _  ',
        ' _| ',
        ' _| ',
        '    '],
    ['    ',
        '|_| ',
        '  | ',
        '    '],
    [' _  ',
        '|_  ',
        ' _| ',
        '    '],
    [' _  ',
        '|_  ',
        '|_| ',
        '    '],
    [' _  ',
        '  | ',
        '  | ',
        '    '],
    [' _  ',
        '|_| ',
        '|_| ',
        '    '],
    [' _  ',
        '|_| ',
        ' _| ',
        '    ']];

class AccountNumberBuilder {

    constructor() {
        this.work = "";
        this.illegal = false;
    }

    setDigitAt(pos, numeral) {
        this.work += numeral;
    }

    setUnknownAt(pos) {
        this.work += "?";
    }

    markAsIllegal() {
        this.illegal = true;
    }

    toString() {
        return `${this.work} ${this.marker()}`;
    }

    marker() {
        if (this.illegal) {
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
                for (let numeral = 0; numeral <= 9; ++numeral) {
                    let ok = true;
                    for (let row = 0; row < 4; ++row) {
                        for (let col = 0; col < 4; ++col) {
                            if (NUMERALS[numeral][row][col] !== lines[i + row][4 * pos + col])
                                ok = false;
                        }
                    }
                    if (ok) {
                        work.setDigitAt(pos, numeral);
                        got1 = true;
                        break;
                    }
                }
                if (!got1) {
                    work.setUnknownAt(pos);
                    work.markAsIllegal();
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

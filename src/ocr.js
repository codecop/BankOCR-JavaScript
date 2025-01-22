
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
        this.work = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        for (let pos = 0; pos < 9; ++pos) {
            this.work[pos] = '?';
        }
    }

    setDigitAt(pos, numeral) {
        this.work[pos] = "" + numeral;
    }

    markIllegal() {
        this.work[10] = 'I';
        this.work[11] = 'L';
        this.work[12] = 'L';
    }

    toString() {
        return this.work.join('');
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
                    work.markIllegal();
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

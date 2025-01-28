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
        this.accountNumber = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        this.illegal = false;

        const numberOfAccountNumberDigits = 9;
        for (let pos = 0; pos < numberOfAccountNumberDigits; ++pos) {
            this.accountNumber[pos] = '?';
        }
    }

    setOneDigitAt(pos, numeral) {
        this.accountNumber[pos] = numeral.toString();
    }

    setIllegal() {
        this.illegal = true;
    }

    build() {
        const accountNumber = this.accountNumber.join('');
        // option
        if (accountNumber.indexOf("?")!= -1) {
            return accountNumber + " ILL";
        }
        return accountNumber + this.marker();
    }

    marker() {
        if (this.illegal) {
            return " ILL";

        } else {
            return "    ";
        }
    }
}

class Ocr {

    /**
     * @param {string[]} inputLines 
     * @returns {string[]}
     */
    static parse(inputLines) {
        /** @type {string[]} */
        const accountNumbers = [];

        for (let currentInputLine = 0; currentInputLine < inputLines.length; currentInputLine += 4) {
            let accountNumber = new AccountNumberBuilder();
            const numberOfAccountNumberDigits = 9;
            for (let pos = 0; pos < numberOfAccountNumberDigits; ++pos) {
                let foundMatchingDigit = false;
                const availableDigits = 10;
                for (let numeral = 0; numeral < availableDigits; ++numeral) {
                    let isNumeralMatching = true;
                    for (let row = 0; row < 4; ++row) {
                        for (let col = 0; col < 4; ++col) {
                            if (NUMERALS[numeral][row][col] !== inputLines[currentInputLine + row][4 * pos + col]) {
                                isNumeralMatching = false;
                            }
                        }
                    }
                    if (isNumeralMatching) {
                        accountNumber.setOneDigitAt(pos, numeral);
                        foundMatchingDigit = true;
                        break;
                    }
                }
                if (!foundMatchingDigit) {
                    accountNumber.setIllegal();
                }
            }
            accountNumbers.push(accountNumber.build());
        }

        return accountNumbers;
    }
}

module.exports = {
    Ocr
};

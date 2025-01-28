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

class AccountNumber {
    constructor() {
        this.accountNumber = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        const numberOfAccountNumberDigits = 9;
        for (let pos = 0; pos < numberOfAccountNumberDigits; ++pos) {
            this.accountNumber[pos] = '?';
        }
    }

    setOneDigitAt(pos, numeral) {
        this.accountNumber[pos] = String.fromCharCode(numeral + '0'.charCodeAt(0));
    }

    setIllegal() {
        this.accountNumber[10] = 'I';
        this.accountNumber[11] = this.accountNumber[12] = 'L';
    }
    
    joinAccount() {
        return this.accountNumber.join('')
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
            let accountNumber = new AccountNumber();
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
            accountNumbers.push(accountNumber.joinAccount());
        }

        return accountNumbers;
    }
}

module.exports = {
    Ocr
};

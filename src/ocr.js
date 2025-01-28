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

class Ocr {

    /**
     * @param {string[]} inputLines 
     * @returns {string[]}
     */
    static parse(inputLines) {
        /** @type {string[]} */
        const accountNumbers = [];

        
        for (let currentInputLine = 0; currentInputLine < inputLines.length; currentInputLine += 4) {
            let accountNumber = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
            const numberOfAccountNumberDigits = 9;
            for (let pos = 0; pos < numberOfAccountNumberDigits; ++pos) {
                accountNumber[pos] = '?';
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
                        accountNumber[pos] = String.fromCharCode(numeral + '0'.charCodeAt(0));
                        foundMatchingDigit = true;
                        break;
                    }
                }
                if (!foundMatchingDigit) {
                    accountNumber[10] = 'I';
                    accountNumber[11] = accountNumber[12] = 'L';
                }
            }
            accountNumbers.push(accountNumber.join(''));
        }

        return accountNumbers;
    }
}

module.exports = {
    Ocr
};

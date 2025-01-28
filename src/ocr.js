class Digit {

    constructor(section, value) {
        this.sections = section;
        this.value = value;
    }

    equals(other) {
        for (let row = 0; row < this.sections.length; ++row) {
            if (this.sections[row] !== other.sections[row]) {
                return false;
            }
        }
        return true;
    }
}

class ArabicDigits {

    constructor() {
        this.digits = [
            new Digit([' _  ',
                '| | ',
                '|_| ',
                '    '], 0),
            new Digit(['    ',
                '  | ',
                '  | ',
                '    '], 1),
            new Digit([' _  ',
                ' _| ',
                '|_  ',
                '    '], 2),
            new Digit([' _  ',
                ' _| ',
                ' _| ',
                '    '], 3),
            new Digit(['    ',
                '|_| ',
                '  | ',
                '    '], 4),
            new Digit([' _  ',
                '|_  ',
                ' _| ',
                '    '], 5),
            new Digit([' _  ',
                '|_  ',
                '|_| ',
                '    '], 6),
            new Digit([' _  ',
                '  | ',
                '  | ',
                '    '], 7),
            new Digit([' _  ',
                '|_| ',
                '|_| ',
                '    '], 8),
            new Digit([' _  ',
                '|_| ',
                ' _| ',
                '    '], 9)];
    }

    getValueOf(digit) {
        for (let i = 0; i < this.digits.length; ++i) {
            const isMatching = this.digits[i].equals(digit);
            if (isMatching) {
                return this.digits[i].value;
            }
        }
        return -1;
    }

}

const TEMPLATE = new ArabicDigits();

class AccountNumberBuilder {
    constructor() {
        this.accountNumber = [];
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
        if (accountNumber.indexOf("?") != -1) {
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
                let x = [];
                for (let row = 0; row < 4; ++row) {
                    let y = inputLines[currentInputLine + row].substring(4 * pos, 4 * pos + 4);
                    x.push(y);
                }
                const currentDigit = new Digit(x);

                const matchingNumeral = TEMPLATE.getValueOf(currentDigit);
                if (matchingNumeral != -1) {
                    accountNumber.setOneDigitAt(pos, matchingNumeral);
                } else {
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

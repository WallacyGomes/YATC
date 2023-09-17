export default class Calculator {
    constructor() {
        this.number = document.querySelector('.number');
        this.calc = document.querySelector('#calc');
        this.divBtns = document.querySelector('.calculator');
        this.btns = document.querySelectorAll('.calculator button');
        this.backspaceBtns = document.querySelector('.remove');
        this.equal = document.querySelector('.equal');
    }

    drawNumber() {
        const drawNumber = Math.floor(Math.random() * 100) + 1;
        this.number.innerText = drawNumber;
    }

    showInCalculator(calc) {
        this.calc.value = calc;
    }

    filterCalculate() {
        const regexp = /[A-z\s]/gi;
        const calcValue = this.calc.value.replace(regexp, '');
        this.showInCalculator(calcValue);
    }

    btnNumbers(event) {
        if (event.target.hasAttribute('data-btn')) {
            this.showInCalculator(this.calc.value += event.target.value);
        }
    }

    btnRemoveNumbers(event) {
        if (event.target.hasAttribute('data-clean')) {
            this.calc.value = '';
        } else {
            const number = this.calc.value;
            const numberDeleted = number.slice(0, +number.length - 1);
            this.calc.value = numberDeleted;
        }
    }

    filterCalc() {
        const regexpSignal = /[+\-÷x]/g;
        const splitting = this.calc.value.split(regexpSignal);
        const n1 = +splitting[0];
        const n2 = +splitting[1];
        const signal = this.calc.value.match(regexpSignal).join();
        this.resolveCalc(n1, n2, signal);
    }

    resolveCalc(n1, n2, signal) {
        let result;

        if (signal === '+') {
            result = n1 + n2;
            if (result == this.number.innerText) {
                this.calc.classList.add('point');
                this.drawNumber();
                this.calc.value = result;
            } else {
                this.calc.classList.add('miss');
            }
        } else if (signal === '-') {
            result = n1 - n2;
            if (result == this.number.innerText) {
                this.calc.classList.add('point')
                this.drawNumber();
                this.calc.value = '';
            } else {
                this.calc.classList.add('miss');
            }
        } else if (signal === 'x') {
            result = n1 * n2;
            if (result == this.number.innerText) {
                this.calc.classList.add('point')
                this.drawNumber();
                this.calc.value = '';
            } else {
                this.calc.classList.add('miss');
            }
        } else if (signal === '÷') {
            result = n1 / n2;
            if (result == this.number.innerText) {
                this.calc.classList.add('point')
                this.drawNumber();
                this.calc.value = '';
            } else {
                this.calc.classList.add('miss');
            }
        } else {
            return false;
        }
        this.removeClassPointAndMiss();
        this.calc.value = '';
    }

    removeClassPointAndMiss() {
        if (this.calc.classList.contains('point') || this.calc.classList.contains('miss')){
            setInterval( () => {
                this.calc.classList.remove('point');
                this.calc.classList.remove('miss');
            }, 1000);
        }
    }

    bindEvents() {
        this.filterCalculate = this.filterCalculate.bind(this);
        this.btnNumbers = this.btnNumbers.bind(this);
        this.btnRemoveNumbers = this.btnRemoveNumbers.bind(this);
        this.filterCalc = this.filterCalc.bind(this);
    }

    addEvents() {
        this.calc.addEventListener('change', this.filterCalculate);
        this.divBtns.addEventListener('click', this.btnNumbers);
        this.backspaceBtns.addEventListener('click', this.btnRemoveNumbers);
        this.equal.addEventListener('click', this.filterCalc);
    }

    init() {
        this.bindEvents();
        this.addEvents();
        this.drawNumber();
    }

}
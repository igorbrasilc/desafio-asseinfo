import Bill from './classes/Bills.js';
const BILLS_AVAILABLE = [1, 5, 10, 50, 100];

window.onload = () => {
    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        clearEvents(e);
        receiveWithdrawRequest()
    });

    async function receiveWithdrawRequest() {
        const helperText = document.querySelector('#helper-text');
        helperText.innerText = 'Verificando...';
        const input = document.querySelector("#withdraw-input");
        const value = input.valueAsNumber;
        await sleep(1000);
        const verifiedValue = verifyValue(value, helperText);
        helperText.innerText = 'Ok! Verificando notas...';
        await sleep(1500);
        const bills = countBills(verifiedValue);
        helperText.innerText = 'Notas contadas, liberando para saque...';
        await sleep(700);
        displayBills(bills);
        helperText.innerText = 'Pode sacar! É infinito!';
        const button = document.querySelector('#confirm-button');
        button.innerText = 'Solicitar novo saque'
    }

    function clearEvents(e) {
        e.preventDefault();
        const billsContainer = document.querySelector('#bills-container');
        if (billsContainer) billsContainer.innerHTML = "";
    }

    function countBills(value) {
        let remainingValue = value;
        const billsToWithdraw = {};
        const b = [...BILLS_AVAILABLE];
        for (let i = 0; i < b.length; i++) {
            if (b[i] > remainingValue) {
                if (!billsToWithdraw[b[i - 1]]) billsToWithdraw[b[i - 1]] = 1;
                else billsToWithdraw[b[i - 1]]++;
                remainingValue -= b[i - 1];
                i = 0;
            } 
            if (b[i] === 100) {
                if (!billsToWithdraw[b[i]]) billsToWithdraw[b[i]] = 1;
                else billsToWithdraw[b[i]]++;
                remainingValue -= b[i];
                i = 0;
            }
            if (remainingValue < 1) break;
        }
        return billsToWithdraw;
    }

    function verifyValue(value, element) {
        if (value < 0 || value === NaN) {
            element.innerText = 'O valor deve ser maior que zero!';
            throw new Error('Value must be greater than 0');
        }

        return Math.ceil(value);
    }

    function displayBills(bills) {
        for (const key in bills) {
            new Bill(key, bills[key]).getBills();
        }
    }

    async function sleep(delay) {
        return new Promise((resolve, _rej) => setTimeout(resolve, delay));
    }
}

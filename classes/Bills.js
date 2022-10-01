const BILLS_BY_COLOR = {
    '1': 'lightgrey',
    '5': 'red',
    '10': 'green',
    '50': 'orange',
    '100': 'blue',
}

export default class Bill {
    constructor(value, quantity, body) {
        this.value = value;
        this.quantity = quantity;
        this.color = BILLS_BY_COLOR[value.toString()];
    }

    getBills() {
        const body = document.querySelector('#bills-container');
        const element = `
        <div id="bill-container">
            <div id="bill" class="${this.color}">
                <p>${this.value}</p>
            </div>
            <p>x${this.quantity}</p>
        </div>
        `;
        body.innerHTML += element;
    }
}



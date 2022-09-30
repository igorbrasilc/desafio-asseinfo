window.onload = () => {
    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => receiveWithdrawRequest(e));

    function receiveWithdrawRequest(e) {
        e.preventDefault();
        const input = document.querySelector("#withdraw-input");
        const { value } = input;
        console.log(value);
    }
}
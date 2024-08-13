function displayBalik(balance) {
    const balDiv = document.getElementById('bal');
    balDiv.innerHTML = `Current Balance: $${balance.toFixed(2)}`;
}
document.addEventListener('DOMContentLoaded', function() {
    const balance = parseFloat(localStorage.getItem('balance')) || 0;
    displayBalik(balance);

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    displayTransactions(transactions);
});
document.getElementById('balik').addEventListener('submit', function(event) {
    event.preventDefault();
    let balance = parseFloat(document.getElementById('Balance').value); 
    localStorage.setItem('balance', balance.toFixed(2)); 
    displayBalik(balance);
});
document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    let balance = parseFloat(localStorage.getItem('balance')) || 0;
    balance += amount;
    localStorage.setItem('balance', balance.toFixed(2));
    displayBalik(balance);
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({ description, amount });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    displayTransactions(transactions);
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
});

function displayTransactions(transactions) {
    const transactionsDiv = document.getElementById('transactions');
    transactionsDiv.innerHTML = ''; 

    transactions.forEach(transaction => {
        const transactionDiv = document.createElement('div');
        transactionDiv.className = 'transaction';
        transactionDiv.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'material-icons';
        deleteIcon.textContent = 'remove_circle_outline';
        deleteIcon.addEventListener('click', function() {
            transactions = transactions.filter(t => t !== transaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            displayTransactions(transactions);
            let balance = parseFloat(localStorage.getItem('balance')) || 0;
            balance -= transaction.amount;
            localStorage.setItem('balance', balance.toFixed(2));
            displayBalik(balance);
        });

        transactionDiv.appendChild(deleteIcon);
        transactionsDiv.appendChild(transactionDiv);
    });
}

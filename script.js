let order = [];

function addItem(item, price, inputId) {
    const quantityInput = document.getElementById(inputId);
    const quantity = parseInt(quantityInput.value, 10);

    if (!quantity || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    const existingItem = order.find((entry) => entry.item === item);
    if (existingItem) {
        existingItem.quantity += quantity; // Add to the existing quantity
    } else {
        order.push({ item, price, quantity }); // Add a new item to the order
    }

    quantityInput.value = ""; // Clear the input field
    updateTable();
}

function updateTable() {
    const tbody = document.querySelector("#orderTable tbody");
    tbody.innerHTML = ""; // Clear the table body
    let totalPrice = 0;

    order.forEach(({ item, price, quantity }) => {
        const total = price * quantity;
        totalPrice += total;
        tbody.innerHTML += `
            <tr>
                <td>${item}</td>
                <td>$${price}</td>
                <td>${quantity}</td>
                <td>$${total.toFixed(2)}</td>
            </tr>
        `;
    });

    document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(2)}`;
}

function saveAsFavourite() {
    localStorage.setItem("favouriteOrder", JSON.stringify(order));
    alert("Order saved as favourite!");
}

function applyFavourites() {
    const favourite = JSON.parse(localStorage.getItem("favouriteOrder"));
    if (favourite) {
        order = favourite;
        updateTable();
    } else {
        alert("No favourite order found!");
    }
}

function goBack() {
    window.location.href = "pharmacy.html"; // Replace "order.html" with the correct file name if it's different
}


function resetOrder() {
    order = []; // Clear the order
    updateTable(); // Update the table to reflect the reset
}

function goToPayment() {
    if (order.length === 0) {
        alert("Please add items to your order before proceeding to payment.");
        return;
    }
    localStorage.setItem("currentOrder", JSON.stringify(order));
    window.location.href = "payment.html"; // Navigate to the payment page
}

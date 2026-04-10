let cart = [];
let total = 0;

function toggleCart() {
    document.getElementById('cart-dropdown').classList.toggle('active');
}

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    
    // Анимация кнопки "Добавлено"
    const btn = event.target;
    const oldText = btn.innerText;
    btn.innerText = "В корзине!";
    btn.style.background = "#00ff88";
    setTimeout(() => {
        btn.innerText = oldText;
        btn.style.background = "";
    }, 1000);

    updateUI();
}

function updateUI() {
    const list = document.getElementById('cart-items');
    list.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<div style="display:flex; justify-content:space-between; margin-bottom:5px; font-size:14px">
            <span>${item.name}</span><span>$${item.price.toLocaleString()}</span>
        </div>`;
        list.appendChild(li);
    });
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('total-price').innerText = total.toLocaleString();
}

function openPaymentModal() {
    if (cart.length === 0) return alert("Корзина пуста!");
    document.getElementById('cart-dropdown').classList.remove('active');
    document.getElementById('payment-modal').style.display = "block";
}

function closePaymentModal() {
    document.getElementById('payment-modal').style.display = "none";
}

function processOrder(e) {
    e.preventDefault();
    const btn = document.querySelector('.pay-btn');
    btn.innerText = "Связь со спутником...";
    btn.disabled = true;

    setTimeout(() => {
        alert("Оплата подтверждена! Ожидайте доставку авиапочтой.");
        cart = [];
        total = 0;
        updateUI();
        closePaymentModal();
        btn.innerText = "Оплатить заказ";
        btn.disabled = false;
    }, 2500);
}

// Закрытие при клике по фону
window.onclick = function(e) {
    if (e.target.className === 'modal') closePaymentModal();
}
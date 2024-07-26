const addToCartProcess = async (event) => {

    event.preventDefault();

    const design = document.querySelector('#clothingDesign').value;
    const size = document.querySelector('#size-input').value;
    const price = document.querySelector('#clothingPrice').value;
    const quantity = document.querySelector('#quantity-input').value;

    if (design && size && price && quantity) {
        const response = await fetch('/api/cart/add', {
            method: 'POST',
            body: JSON.stringify({ design, size, price, quantity }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/`);
        } else {
            alert('Failed to add new clothing item.');
        }
    }
}

document
    .querySelector('.addToCartForm')
    .addEventListener('submit', addToCartProcess);
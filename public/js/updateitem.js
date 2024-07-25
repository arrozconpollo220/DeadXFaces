//Front end process for updating a clothing item
const updateProcess = async (event) => {

    event.preventDefault();

    const item_id = document.querySelector('#item-id').value;
    const type = document.querySelector('#type-input').value.trim();
    const designName = document.querySelector('#design-input').value.trim();
    const color = document.querySelector('#color-input').value.trim();
    const price = document.querySelector('#price-input').value.trim();

    if (type && designName && color && price ) {
        const response = await fetch('/api/content/u', {
            method: 'PUT',
            body: JSON.stringify({ item_id, type, designName, color, price }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/`);
        } else {
            alert('Failed to update item.');
        }
    }
}

document
    .querySelector('.updateItemForm')
    .addEventListener('submit', updateProcess);
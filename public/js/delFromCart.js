const deleteFromCartProcess = async (event) => {

    event.preventDefault();

    const cartitem_id = document.querySelector('#cartitem_id').value;

    if (cartitem_id) {
        const response = await fetch(`/api/cart/delete/${cartitem_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/`);
        } else {
            alert('Failed to delete item.');
        }
    }
}

document
    .querySelector('.remove-btn')
    .addEventListener('click', deleteFromCartProcess);
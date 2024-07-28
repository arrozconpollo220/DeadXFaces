const deleteFromCartProcess = async (event) => {

    event.preventDefault();

    const cartitem_id = event.target.getAttribute('data-id');

    if (cartitem_id) {
        const response = await fetch(`/api/cart/delete/${cartitem_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/cart`);
        } else {
            alert('Failed to delete item.');
        }
    }
}

document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', deleteFromCartProcess);
  });
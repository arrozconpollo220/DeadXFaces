//Front end process for deleting a clothing item
const deleteProcess = async (event) => {

    event.preventDefault();

    const item_id = document.querySelector('#item-id').value;

    if (item_id) {
        const response = await fetch(`/api/content/d/${item_id}`, {
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
    .querySelector('.delete-item')
    .addEventListener('click', deleteProcess);
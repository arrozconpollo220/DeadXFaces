//Front end process for deleting a clothing item
const deleteSizeProcess = async (event) => {

    event.preventDefault();

    const size_value = document.querySelector('#sizeOptions').value; 
    const clothing_id = document.querySelector('#item-id').value;

    if (size_value && clothing_id) {
        const response = await fetch(`/api/size/delete`, {
            method: 'DELETE',
            body: JSON.stringify({ size_value, clothing_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`../update/${clothing_id}`);
        } else {
            alert('Failed to delete item.');
        }
    }
}

document
    .querySelector('.delete-size')
    .addEventListener('click', deleteSizeProcess);
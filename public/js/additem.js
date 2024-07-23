const addItemProcess = async (event) => {

    event.preventDefault();

    const type = document.querySelector('#type-input').value.trim();
    const designName = document.querySelector('#design-input').value.trim();
    const color = document.querySelector('#color-input').value.trim();
    const price = document.querySelector('#price-input').value.trim();
    const image_loc = document.querySelector('#imgloc-input').value.trim();

    if (type && designName && color && price && image_loc) {
        const response = await fetch('/api/content/add', {
            method: 'POST',
            body: JSON.stringify({ type, designName, color, price, image_loc }),
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
    .querySelector('.newItemForm')
    .addEventListener('submit', addItemProcess);
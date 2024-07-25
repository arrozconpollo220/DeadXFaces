const addSizeProcess = async (event) => {

    event.preventDefault();

    const size_value = document.querySelector('#sizeOptions').value; 
    const sizeNameList = ["Fits All", "Small","Medium", "Large", "X-Large", "XX-Large", "XXX-Large"];
    let size_name = sizeNameList[size_value];
    const clothing_id = document.querySelector('#item-id').value;
    

    if (size_value && clothing_id) {
        const response = await fetch('/api/size/add', {
            method: 'POST',
            body: JSON.stringify({ size_value, size_name, clothing_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`../update/${clothing_id}`);
        } else {
            alert('Failed to add new size to clothing item.');
        }
    }
}

document
    .querySelector('.sizeOptionsForm')
    .addEventListener('submit', addSizeProcess);
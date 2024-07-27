document.addEventListener('DOMContentLoaded', () => {
    const removeButtons = document.querySelectorAll('.remove-btn');

    removeButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const itemId = event.target.dataset.id;
            const design = event.target.dataset.design; // Asegúrate de que esto tenga el valor correcto

            console.log(`Item ID: ${itemId}, Design: ${design}`); // Verifica los valores

            const response = await fetch(`/api/cart/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: itemId, design }) // Asegúrate de que design esté incluido
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to remove item from cart.');
            }
        });
    });
});
//Front end process for signing up for a new account
const signUpProcess = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#username-input').value.trim();
    const email = document.querySelector('#email-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
}

document
    .querySelector('.signup-form')
    .addEventListener('submit', signUpProcess);
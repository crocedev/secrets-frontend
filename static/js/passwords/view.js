function copyPasswordToClipboard() {
    const passwordField = document.getElementById('password');
    navigator.clipboard.writeText(passwordField.value)
        .then(() => {
            alert('Password copied to clipboard.');
        })
        .catch((error) => {
            console.error('Failed to copy password: ', error);
            alert('Failed to copy password. Please try again.');
        });
}

function deletePassword(passwordId) {
    const confirmation = confirm('Are you sure you want to delete this password?');

    if (confirmation) {
        fetch(`http://localhost:8000/passwords/${passwordId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    alert('Password deleted successfully.');
                    window.location.assign('/passwords');
                } else if (response.status === 404) {
                    alert('The requested password was not found.');
                } else if (response.status === 422) {
                    alert('Validation error.');
                } else {
                    throw new Error('Failed to delete password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to delete password. Please try again.');
            });
    }

    return false;
}

function editPassword(passwordId) {
    window.location.assign(`/passwords/${passwordId}/edit`);
}

function backToPage() {
    window.location.assign(`/passwords`);
    return false;
}

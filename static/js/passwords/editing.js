function savePassword(passwordId) {
    const data = {
        title: document.getElementById('title').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        url: document.getElementById('url').value,
        note: document.getElementById('note').value
    };

    fetch(`http://localhost:8000/api/v1/passwords/${passwordId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                window.location.assign('/passwords');
            } else if (response.status === 404) {
                alert('The requested password was not found.');
            } else if (response.status === 422) {
                alert('Validation error.');
            } else {
                throw new Error('Failed to update password.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update password. Please try again.');
        });
    return false;
}

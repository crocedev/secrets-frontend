function createPassword() {
    const data = {
        'title': document.getElementById('title').value,
        'username': document.getElementById('username').value,
        'password': document.getElementById('password').value,
        'url': document.getElementById('url').value,
        'note': document.getElementById('note').value
    };
    console.log(JSON.stringify(data));
    fetch(`http://localhost:8000/passwords`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                alert('Password created successfully.');
                window.location.assign('/passwords');
            } else if (response.status === 422) {
                alert('Validation error.');
            } else {
                alert('Failed to create password.');
            }
        })
        .catch(error => {
            console.error(error);
            alert('Failed to create password. Please try again.');
        });
    return false;
}

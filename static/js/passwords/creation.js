function createPassword() {
    const data = {
        'title': document.getElementById('title').value,
        'username': document.getElementById('username').value,
        'password': document.getElementById('password').value,
        'url': document.getElementById('url').value,
        'note': document.getElementById('note').value
    };
    console.log(JSON.stringify(data));
    fetch(`http://localhost:8000/api/v1/passwords`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
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

function generatePassword() {
    const length = 12; // Можно изменить на желаемую длину пароля
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById('password').value = password;
    return false;
}

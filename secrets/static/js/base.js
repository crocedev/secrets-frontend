const nav = document.getElementById('nav');

function handleLogout() {
    fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
    })
        .then((response) => {
            if (response.status === 204) {
                location.href = "/login";
            } else if (response.status === 401) {
                showModal('Вы не авторизованы.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function handleRecords() {
    location.href = '/passwords';
}

function handleLogin() {
    location.href = '/login';
}

function handleRegister() {
    location.href = '/register';
}


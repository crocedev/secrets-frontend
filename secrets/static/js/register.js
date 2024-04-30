document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (!email) {
            alert('Invalid email.');
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8000/auth/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            email: email,
            password: password,
            first_name: firstName
        }));

        xhr.onload = function () {
            if (xhr.status === 201) {
                window.location.href = '/login';
            } else if (xhr.status === 400) {
                const response = JSON.parse(xhr.responseText);
                if (response.detail === 'REGISTER_USER_ALREADY_EXISTS') {
                    alert('A user with this email already exists.');
                } else if (response.detail.code === 'REGISTER_INVALID_PASSWORD') {
                    alert('Password validation failed: ' + response.detail.reason);
                }
            } else if (xhr.status === 422) {
                alert('Validation error.');
            }
        };
    });
});

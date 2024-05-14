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

            fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    first_name: firstName
                })
            })
                .then(response => {
                    if (response.ok) {
                        window.location.assign('/login');
                    } else if (response.status === 404) {
                        alert('The requested resource was not found.');
                    } else if (response.status === 422) {
                        return response.json();
                    } else {
                        // Handle other errors
                        throw new Error('An error occurred.');
                    }
                })
                .then(data => {
                    if (data && data.detail === 'REGISTER_USER_ALREADY_EXISTS') {
                        alert('A user with this email already exists.');
                    } else if (data && data.detail.code === 'REGISTER_INVALID_PASSWORD') {
                        alert('Password validation failed: ' + data.detail.reason);
                    } else {
                        alert('An error occurred during validation.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                });
        }
    );
});
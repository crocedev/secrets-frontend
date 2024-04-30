document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8000/auth/login', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        const params = 'grant_type=password&username=' + encodeURIComponent(email) +
            '&password=' + encodeURIComponent(password) +
            '&scope=&client_id=&client_secret=';

        xhr.send(params);

        xhr.onload = function () {
            if (xhr.status === 204) {
                window.location.href = '/passwords';
            } else if (xhr.status === 400) {
                const response = JSON.parse(xhr.responseText);
                if (response.detail === 'LOGIN_BAD_CREDENTIALS') {
                    alert('Bad credentials or the user is inactive.');
                } else if (response.detail === 'LOGIN_USER_NOT_VERIFIED') {
                    alert('The user is not verified.');
                }
            } else if (xhr.status === 422) {
                alert('Validation error.');
            }
        };
    });
});

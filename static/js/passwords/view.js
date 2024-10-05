import {backendUrl} from '../clients/config.js';

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-visibility');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = 'visibility_off';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = 'visibility';
    }
}


function deletePassword(passwordId) {
    const confirmation = confirm('Are you sure you want to delete this password?');

    if (confirmation) {
        fetch(backendUrl + `/passwords/${passwordId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
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

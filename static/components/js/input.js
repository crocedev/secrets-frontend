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

function copyPasswordToClipboard() {
    const passwordField = document.getElementById('password');
    navigator.clipboard.writeText(passwordField.value)
        .catch((error) => {
            console.error('Failed to copy: ', error);
            alert('Failed to copy');
        });
}

import {ApiClient} from './base.js';

export class AuthClient extends ApiClient {

    handleLoginErrors(status, data) {
        if (status === 400) {
            alert('Bad credentials or the user is inactive.');
        } else {
            super.handleErrors(status, data);
        }
    }

    async login(email, password) {
        const form = new URLSearchParams();
        form.append('grant_type', 'password');
        form.append('username', email);
        form.append('password', password);
        form.append('scope', '');
        form.append('client_id', '');
        form.append('client_secret', '');
        return this.post('/auth/login', {}, form, this.handleLoginErrors);
    }

    handleRegisterErrors(status, data) {
        if (status === 400 && data.detail === 'REGISTER_USER_ALREADY_EXISTS') {
            alert('A user with this email already exists.');
        } else {
            super.handleErrors(status, data);
        }
    }

    async register(firstName, email, password) {
        return this.post('/auth/register', {}, {
            email: email,
            password: password,
            first_name: firstName
        }, {}, this.handleRegisterErrors);
    }
}

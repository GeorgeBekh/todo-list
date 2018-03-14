import store from 'store2';
import axios from 'axios';

class User {
    static register (login, password, onSuccess, onFailure) {
        axios.post(`/api/registration`, {
            login: login,
            password: password
        })
        .then(response => {
            if (response.status === 200) {
                onSuccess();
            } else {
                onFailure();
            }
        });
    }

    static authenticate (login, password, onSuccess, onFailure) {
        axios.post(`/api/login`, {
            login: login,
            password: password
        })
        .then(response => {
            if (response.status === 200) {
                store.session('user', response.data.user);
                store.session('token', response.data.token);

                console.log("Authentication successful!");
                console.log("User id: " + this.getId() + ", Auth token: " + store.session('token'));

                onSuccess();
            } else {
                onFailure();
            }
        });
    };

    static request (request, callback) {
        request.headers = {'User-Authentication': store.session('token')};
        axios(request).then(callback);
    }

    static getId () {
        return store.session('user').id;
    };

    static getLogin () {
        return store.session('user').login;
    };

    static isAuthenticated () {
        return Boolean(store.session('token'));
    };

    static logout () {
        return store.session.remove('user');
    };
}

export default User;

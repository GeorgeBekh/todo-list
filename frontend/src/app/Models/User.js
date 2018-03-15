import store from 'store2';
import axios from 'axios';

class User {
    register (login, password, onSuccess, onFailure) {
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

    authenticate (login, password, onSuccess, onFailure) {
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

    request (request, callback) {
        request.headers = {'User-Authentication': store.session('token')};
        axios(request).then(callback);
    }

    getId () {
        return store.session('user').id;
    };

    getLogin () {
        return store.session('user').login;
    };

    isAuthenticated () {
        return Boolean(store.session('token'));
    };

    logout () {
        return store.session.remove('user');
    };
}

export default User;

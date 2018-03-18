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
            }
        }).catch(error => {
            onFailure(error.response.data);
        });
    }

    authenticate (login, password, onSuccess, onFailure) {
        axios.post(`/api/login`, {
            login: login,
            password: password
        })
        .then(response => {
            if (response.status !== 200) {
                return;
            }
            store.session('user', response.data.user);
            store.session('token', response.data.token);

            onSuccess();
        }).catch(error => {
            onFailure(error.response.data);
        });
    }

    checkAuthentication (callback) {
        let token = store.session('token');
        if (!token) {
            callback(false);
            return;
        }
        
        this.request({
            method: 'get',
            url: '/api/user'
        }, response => {
            callback(true);
        }, error => {
            callback(false);
        });
    }

    request (request, callback, onError) {
        request.headers = {'User-Authentication': store.session('token')};
        axios(request).then(callback).catch(onError);
    }

    getId () {
        return store.session('user').id;
    }

    getLogin () {
        return store.session('user').login;
    }

    logout () {
        return store.session.remove('user');
    }
}

export default User;

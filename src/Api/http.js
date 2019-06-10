import axios from 'axios';
import iView from 'iview'
import QS from 'qs';

axios.defaults.timeout = 8000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
if (process.env.NODE_ENV == 'development') {
    // axios.defaults.baseURL = '/API';
}
else if (process.env.NODE_ENV == 'debug') {
    // axios.defaults.baseURL = '';
}
else if (process.env.NODE_ENV == 'production') {
    // axios.defaults.baseURL = '/api/party';
}

//请求拦截器
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)

})
//响应拦截器
axios.interceptors.response.use(response => {

    return response
}, error => {
    return Promise.reject(error)
})

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {

            if (res.data.result == 0) {
                iView.$Message.error(res.data.msg);
            }
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {

                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export default {
    // 拦截器
    interceptors: {
        request(config) {
            if (sessionStorage.token) {
                config.headers.common['token'] = sessionStorage.token;
            }
            return config
        },
        response(response) {
            if (response.data.message) {
                return Promise.reject(response.data)
            }
            return response
        },
    }
}
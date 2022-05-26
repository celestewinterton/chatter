export const tokenFetch = async (url, options = {}) => {
    // if no method, default to get
    options.method = options.method || 'GET';
    // if no headers, default to empty object
    options.headers = options.headers || {};

    //get csrf token to send to the backend
    options.headers['csrf_token'] = document.cookie.match('(^|;)\\s*' + 'csrf_token' + '\\s*=\\s*([^;]+)')?.pop() || ''


    const res = await window.fetch(url, options);

    return res;
}

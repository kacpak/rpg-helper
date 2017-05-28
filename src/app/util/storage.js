const tokenKey = 'JWT';

export function getJwtToken() {
    return localStorage.getItem(tokenKey);
}

export function saveJwtToken(token) {
    if (token) {
        localStorage.setItem(tokenKey, token);
    } else {
        localStorage.removeItem(tokenKey);
    }
}

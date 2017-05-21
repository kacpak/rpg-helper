export function getAuthorizationHeader(username, password) {
    return `Basic ${btoa(`${username}:${password}`)}`;
}

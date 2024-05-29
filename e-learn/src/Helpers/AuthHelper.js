export function getAuthToken() {
    return localStorage.getItem('token');
}

export function getRole() {
    return localStorage.getItem('role');
}

export function getUserName() {
    return localStorage.getItem('userName');
}

export function getEmail() {
    return localStorage.getItem('email');
}

export function getFullName() {
    return localStorage.getItem('fullName');
}
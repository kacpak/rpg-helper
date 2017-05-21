const users = [
    {
        id: 1,
        username: 'kacpak',
        password: 'secret'
    },
    {
        id: 2,
        username: 'test',
        password: 'test'
    }
];

export function findUserByUsername(name) {
    return users.find(user => user.username === name);
}


export function findUserById(id) {
    return users.find(user => user.id === id);
}

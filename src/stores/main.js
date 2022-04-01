class Users {
    users = {};

    get() {
        return this.users;
    }

    set(updatedUsers) {
        this.users = {
            ...this.users,
            updatedUsers
        }
        return this.users;
    }

}

export const UsersStore = new Users();
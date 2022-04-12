import { action, makeObservable, observable } from "mobx";

class UsersStore {
  users = [];

  setUsers(users) {
    this.users = users;
  }

  addUser(user) {
      this.users.push(user);
  }

  constructor() {
    makeObservable(this, {
      users: observable,
      setUsers: action,
      addUser: action,
    });
  }
}

export default UsersStore;
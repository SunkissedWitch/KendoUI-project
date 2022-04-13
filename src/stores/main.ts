import { action, makeObservable, observable } from "mobx";
import { IUser } from '../services/interfaces';


class UsersStore {
  users: Array<IUser> = [];
  load: boolean = false;

  setUsers(users: Array<IUser> ) {
    this.users = users;
  }

  addUser(user: IUser ) {
    this.users.push(user);
  }

  isLoading(status: boolean) {
    this.load = status;
  }

  constructor() {
    makeObservable(this, {
      users: observable,
      load: observable,
      setUsers: action,
      addUser: action,
      isLoading: action,
    });
  }
}

export default UsersStore;
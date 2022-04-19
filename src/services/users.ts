import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { users as mockUsers } from "../stores/MockAPI";

let users = mockUsers;

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios, { delayResponse: 1000 });

// Mock any GET request to /users
// arguments for reply are (status, data, headers)

mock.onGet("/users").reply(200, users);

mock.onGet(/detail\/\S+/).reply((config: any) => {
  const url: string = config.url;
  const [ , route, userName ] = url.split('/');
  const user = users.find(({ user_name }) => user_name === userName);
  return [200, user];
});

mock.onPut("/edit_user").reply((data: any): any => {
  const updatedUser = JSON.parse(data.data);
  const { first_name, last_name, enabled } = updatedUser;
  const index = users.findIndex(
    (obj) => obj.user_name === updatedUser.user_name
  );

  users[index] = {
    ...users[index],
    first_name: first_name,
    last_name: last_name,
    enabled: enabled,
  };
  return [204, users[index]];
});

mock.onPost("/add_user").reply((data: any): any => {
  const newUser = JSON.parse(data.data);
  users.push({
    ...newUser,
    last_login: new Date().toString(),
  });
  return [200, newUser];
});

const fetchUsers = async (): Promise<{}> => {
  const response = await axios.get("/users");
  return response.data;
};

const fetchUser = async (user: string): Promise<{}> => {
  try {
    const response = await axios.get(`/detail/${user}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const addUser = async (url: string, JSONdata: {}): Promise<{}> => {
  try {
    const response = await axios.post(url, JSONdata);
    return response;
  } catch (error) {
    console.log(error);
    return JSONdata;
  }
};

const editUser = async (url: string, JSONdata: {}): Promise<{}> => {
  try {
    const response = await axios.put(url, JSONdata);
    return response;
  } catch (error) {
    console.log(error);
    return JSONdata;
  }
};

export { addUser, fetchUser, fetchUsers, editUser };

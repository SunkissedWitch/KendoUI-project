import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { users as mockUsers } from '../stores/MockAPI';

let users = mockUsers;


// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios, { delayResponse: 1000 });

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/users").reply(200, users);

// (/\/user\/\S+/)

mock.onGet(/\S+/).reply((config: any) => {
  const userName: string = config.url;
  const user = users.find( ({ user_name }) => user_name === userName );

  return [200, user];
});


mock.onPost("/add_user").reply( (data: any): any => {
  const newUser = JSON.parse(data.data);
  users.push({
    ...newUser,
    last_login: new Date().toString()
  });
  return [
    200,
    newUser
  ]
});


const fetchUsers = async (): Promise<{}> => {
    const response = await axios.get("/users");
    
    return response.data;
}


const fetchUser = async (user: string | undefined): Promise<{}> => {
  const response = await axios.get(`${user}`);
  console.log(`${user}`, response.data)
  
  return response.data;
}


const addUser = async (JSONdata: {}): Promise<{}> => {
  
  const response = await axios.post("/add_user", JSONdata);
  console.log("addUser", response.data);
  return response;
}

export { addUser, fetchUser, fetchUsers };
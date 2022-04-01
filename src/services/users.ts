import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/users").reply(200, {
  users: [{"user_name":"rarmin0","first_name":"Rosetta","last_name":"Armin","last_login":"2021-12-09 00:51:51","enabled":false},
  {"user_name":"hgoude1","first_name":"Hakim","last_name":"Goude","last_login":"2022-03-10 09:52:26","enabled":true},
  {"user_name":"dsatchell2","first_name":"Deloria","last_name":"Satchell","last_login":"2021-08-03 16:06:15","enabled":true},
  {"user_name":"kpigne3","first_name":"Kimmy","last_name":"Pigne","last_login":"2021-12-12 08:25:11","enabled":false},
  {"user_name":"apeers4","first_name":"Allyson","last_name":"Peers","last_login":"2021-12-11 13:30:45","enabled":true},
  {"user_name":"cmawhinney5","first_name":"Cecile","last_name":"Mawhinney","last_login":"2022-02-20 01:27:29","enabled":true},
  {"user_name":"mpeachey6","first_name":"Marcos","last_name":"Peachey","last_login":"2021-06-15 10:15:25","enabled":true},
  {"user_name":"neadie7","first_name":"Nathan","last_name":"Eadie","last_login":"2021-09-10 20:43:43","enabled":false},
  {"user_name":"lgallaccio8","first_name":"Lesya","last_name":"Gallaccio","last_login":"2022-02-25 03:47:38","enabled":true},
  {"user_name":"dchalloner9","first_name":"Darbie","last_name":"Challoner","last_login":"2021-09-14 13:46:12","enabled":true},
  {"user_name":"mpulstera","first_name":"Mil","last_name":"Pulster","last_login":"2022-01-11 09:00:53","enabled":false},
  {"user_name":"frenachowskib","first_name":"Fee","last_name":"Renachowski","last_login":"2021-09-11 02:50:05","enabled":true},
  {"user_name":"breariec","first_name":"Benetta","last_name":"Rearie","last_login":"2021-09-29 15:06:50","enabled":true},
  {"user_name":"chegged","first_name":"Carole","last_name":"Hegge","last_login":"2021-04-18 12:13:38","enabled":false},
  {"user_name":"lsextonee","first_name":"Lauritz","last_name":"Sextone","last_login":"2021-09-04 19:45:51","enabled":true},
  {"user_name":"tblabyf","first_name":"Timothy","last_name":"Blaby","last_login":"2021-05-09 10:51:59","enabled":true},
  {"user_name":"nmacknielyg","first_name":"Nettie","last_name":"MacKniely","last_login":"2021-12-04 20:20:04","enabled":true},
  {"user_name":"bconquesth","first_name":"Berty","last_name":"Conquest","last_login":"2021-04-08 09:24:53","enabled":false}]
});

const fetchUser = async (): Promise<{}> => {
    const response = await axios.get("/users");
    
    return response.data;
}

export {
    fetchUser
}
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@progress/kendo-react-buttons';
import UserList from './UsersList';
import NewUserDialog from	'./NewUserDialog';

function Home () {

	const navigate = useNavigate();
	const [ open, setOpen ] = useState <boolean>(false);


	const dialogClose = () => {
    setOpen(!open);
		console.log("open", open)
  };

	return(
		<>
			<p>Home page</p>
			{open &&
				<NewUserDialog dialogClose={dialogClose} />
			}

			<Button 
			onClick={() => setOpen(true)}
			>New User</Button>

			<UserList />

			<Button 
			onClick={() => navigate('/detail/:user')}
			>UserDetail</Button>

		</>
	)  

}

export default Home;
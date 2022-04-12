import React, { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import UserList from './UsersList';
import NewUserDialog from	'./NewUserDialog';


const Home = ((props: any) => {

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

		</>
	)
});

export default Home;
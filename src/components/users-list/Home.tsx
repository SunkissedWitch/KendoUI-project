import { useState, useContext } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { observer } from "mobx-react-lite";
import { StoreContext } from '../../App';
import { fetchAndFormatGridData } from '../../services/helpers';
import { loadingPanel } from '../../services/constants';
import UserList from './UsersList';
import NewUserDialog from	'./NewUserDialog';


const Home = observer (() => {
	const store: any = useContext(StoreContext);
	const loading = store.load;

	const [ open, setOpen ] = useState <boolean>(false);
	
	const dialogClose = () => {
    setOpen(!open);

		fetchAndFormatGridData().then(
      data => store.setUsers(data)).then(() => store.isLoading(true))
  };

	return(
		<div className='home-page'>

			<h1>Home page</h1>

			{open &&
				<NewUserDialog dialogClose={dialogClose} />
			}

			<Button 
			themeColor={"primary"}
			size={"large"}
			onClick={() => setOpen(true)}>
				New User
			</Button>

			{!loading && loadingPanel}

			<UserList />

		</div>
	)
});

export default Home;
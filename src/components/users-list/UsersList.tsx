// export const some= "some";
// import { observer } from 'mobx';

// const UsersList = observer(({UsersStore})) => {

// }

import React, { useState, useEffect, ReactElement, cloneElement } from 'react';
import { fetchUser } from '../../services/users';
import { process, State } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridRowProps } from '@progress/kendo-react-grid';
import { Window } from '@progress/kendo-react-dialogs/dist/npm/Window';

interface AppProps {}
interface AppState {
  gridDataState: State;
  windowVisible: boolean;
  gridClickedRow: any;
}

function DataGrid <AppProps>() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUser().then((data: any) => {
      for (let user of data.users) {
        user.last_login = new Date(user.last_login);
        user.full_name = `${user.first_name} ${user.last_name}`;
      }
      console.log(data.users);
      setUsers(data.users);
    })
  }, []);

  const [ state, setState ] = useState <AppState> (
    {
      gridDataState: {
        sort: [
          { field: "user_name", dir: "asc" }
        ],
        skip: 0,
        take: 10
      },
      windowVisible: false,
      gridClickedRow: {},
    }
  );

  const rowRender = (
    trElement: ReactElement<HTMLTableRowElement>,
    props: GridRowProps
  ) => {
    const defaultColor = { backgroundColor: "default" };
    const red = { backgroundColor: "rgb(243, 23, 0, 0.32)" };
    const trProps: any = { style: props.dataItem.enabled ? defaultColor : red };
    return cloneElement(
      trElement,
      { ...trProps },
      trElement.props.children
    );
  };

 const handleGridDataStateChange = (e: any ) => {
    setState({...state, gridDataState: e.dataState});
  }

  const handleGridRowClick = (e: {dataItem : object}) => {
    setState({
      ...state,
        windowVisible: true,
        gridClickedRow: e.dataItem
    });
  }

  const closeWindow = (e: any) => {
    setState({
      ...state,
        windowVisible: false
    });
  }

  return (
    <div className="App">

      <Grid
        rowRender={rowRender}
        onRowClick={handleGridRowClick}
        data={process(users, state.gridDataState)}
        pageable={true}
        sortable={true}
        reorderable={true}
        filterable={true}
        {...state.gridDataState}
        onDataStateChange={handleGridDataStateChange}
        style={{ height: "600px" }}>
        <GridColumn field="user_name" title="User Name" />
        <GridColumn field="full_name" filterable={false} title="Full Name" />
        <GridColumn field="last_login" filterable={false} title="Last Login" format="{0:yyyy-MM-dd HH:mm:ss}" />
        <GridColumn field="enabled" title="Enabled" filterable={false} cell={checkboxColumn} />
      </Grid>
      {state.windowVisible &&
        <Window
          title="Product Details"
          onClose={closeWindow}
          height={250}>
          <dl style={{textAlign:"left"}}>
            <dt>First Name</dt>
            <dd>{state.gridClickedRow.first_name}</dd>
            <dt>Last Name</dt>
            <dd>{state.gridClickedRow.last_name}</dd>
            <dt>Enabled</dt>
            <dd>{state.gridClickedRow.enabled}</dd>
          </dl>
        </Window>
      }
    </div>
  );
}

// interface IProps {
//   dataItem: any;
//   field: string;
// }

const checkboxColumn = (props: any) => {
    // console.log("dataItem", props.dataItem, "field", props.field)
    const id = props.dataItem[props.field];
    const enabled = id ? "Yes" : "No";
    const color = id ? "" : '';

    return (
        <td>
          {enabled}
        </td>
    );

}

export default DataGrid;
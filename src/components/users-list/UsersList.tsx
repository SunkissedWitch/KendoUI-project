import React, { useState, useEffect, useContext } from 'react';
import { observer } from "mobx-react-lite";
import { StoreContext } from '../../App';
import { useNavigate } from "react-router-dom";
import { fetchUsers } from '../../services/users';
import { process, State } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridRowProps } from '@progress/kendo-react-grid';

interface AppState {
  gridDataState: State;
}

const DataGrid = observer(() => {

  const store: any = useContext(StoreContext);
  const navigate = useNavigate();

  const [ state, setState ] = useState <AppState> (
    {
      gridDataState: {
        sort: [
          { field: "user_name", dir: "asc" }
        ],
        skip: 0,
        take: 10
      }
    }
  );

  useEffect(() => {
    fetchUsers().then((data: any) => {

      const formatedData = data.map( (item: any) => {
        return { ...item,
          last_login: new Date(item.last_login),
          full_name: `${item.first_name} ${item.last_name}`,
        }
      })
      store.setUsers(formatedData);
    })
  }, [state]);


  const rowRender = (
    trElement: React.ReactElement<HTMLTableRowElement>,
    props: GridRowProps
  ) => {
    const available = !props.dataItem.enabled;
    const white = { backgroundColor: "#fff" };
    const red = { backgroundColor: "rgb(243, 23, 0, 0.32)" };
    const trProps: any = { style: available ? red : white };

    return React.cloneElement(
      trElement,
      { ...trProps },
      trElement.props.children
    );
  };

 const handleGridDataStateChange = (e: any ) => {
    setState({...state, gridDataState: e.dataState});
  }

  const handleGridRowClick = (e: {dataItem : {[key: string]: string}}) => {
    const url = e.dataItem.user_name;
    navigate (`/detail/${url}`)
  }

  return (
    <div className="App">

      <Grid
        rowRender={rowRender}
        onRowClick={handleGridRowClick}
        data={process(store.users, state.gridDataState)}
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
    </div>
  );
})

const checkboxColumn = (props: any) => {
    const id = props.dataItem[props.field];
    const enabled = id ? "Yes" : "No";

    return (
        <td>
          {enabled}
        </td>
    );

}

export default DataGrid;
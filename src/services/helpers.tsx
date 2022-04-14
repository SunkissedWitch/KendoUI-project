import { fetchUsers } from '../services/users';

export const fetchAndFormatGridData = async () => {

  const result = await fetchUsers().then((data: any) => {

    const formatedData = data.map( (item: any) => {
      return { ...item,
        last_login: new Date(item.last_login),
        full_name: `${item.first_name} ${item.last_name}`,
      }
    })

    return formatedData;
  })
  return result;
}
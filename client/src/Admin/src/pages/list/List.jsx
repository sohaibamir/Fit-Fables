import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Datatable from "../../components/datatable/Datatable"
import { getAllUsersAdmin } from "../../../../api/api";
import { useEffect, useState } from "react";

const List = () => {
  const [users, setUsers] = useState({
    tableHeader: [],
    tableBody: []
  })

  useEffect(() => {
    getAllUsersAdmin()
      .then((res) => {
        console.log(res)
        if (res.data && res.data.data && res.data.data.length > 0) {
          let fetchData = res.data.data.map(({ createdAt, updatedAt, password, gender,role, username, authType, __v, ...rest }) => { return rest })
          console.log(fetchData)
          if (fetchData.length > 0) {
            let tableHeader = Object.keys(fetchData[0])
            let tableBody = fetchData.map((dat) => { return { _id: dat._id, name: dat.name, email: dat.email,phone:dat.phone ,addr: dat.address } })
            setUsers({
              tableHeader, tableBody
            })
          }
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        {/* <Navbar/> */}
        <Datatable tableTitle="Users" tableData={users} />
      </div>
    </div>
  );
};

export default List;

import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Datatable from "../../components/datatable/Datatable"

const ProductList = () => {
  const ordersData = {
    tableHeader: ["Name", "Phone", "Email"],
    tableBody: [
      {
        name:"Product1",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Product2",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Product3",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Product4",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Product5",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Product6",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Product7",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
    ],
  };

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        {/* <Navbar/> */}
        <Datatable ordersData={ordersData}
            callFrom={"Products"}
        />
      </div>
    </div>
  )
}

export default ProductList
import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Datatable from "../../components/datatable/Datatable"

const List = () => {
  const data=[
    {
        name:"Haseeb1",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb2",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb3",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb4",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb5",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb6",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb7",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb8",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb9",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb10",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb11",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb12",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb13",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb14",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb15",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb16",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb17",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb18",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb19",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
      {
        name:"Haseeb20",
        pass:"0000",
        email:"ha@123.gmail.com"
      },
]
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Datatable data={data}
          callFrom={"Users"}
        />
      </div>
    </div>
  )
}

export default List
import "./list.scss";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/datatable/Datatable";
import { getAllProductsAdmin } from "../../../../api/api";

const ProductList = () => {
  const [products, setProducts] = useState({
    tableHeader: [],
    tableBody: [],
  });

  useEffect(() => {
    getAllProductsAdmin()
      .then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          let fetchData = res.data.data.map(
            ({
              img2,
              img3,
              createdAt,
              updatedAt,
              crossed_price,
              manufacturer,
              sub_category,
              country,
              quantity,
              __v,
              ...rest
            }) => {
              return rest;
            }
          );
          console.log(fetchData);
          if (fetchData.length > 0) {
            let tableHeader = Object.keys(fetchData[0]);
            let tableBody = fetchData.map((data) => {
              return {
                img1: data.img1,
                id: data.id,
                title: data.title,
                actual_price: data.actual_price,
                category: data.category,
                _id: data._id,
              };
            });
            setProducts({
              tableHeader,
              tableBody,
            });
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Datatable tableTitle="Products" tableData={products} />
      </div>
    </div>
  );
};

export default ProductList;

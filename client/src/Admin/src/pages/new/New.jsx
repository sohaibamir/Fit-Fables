import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { Carousel } from 'react-bootstrap'
import { createProduct } from "../../../../api/api";

const New = ({ inputs, title }) => {
  const [images, setImages] = useState([])
  const [imagePreview, setImagePreview] = useState([])
  const [product, setProduct] = useState({
    id: 0,
    title: '',
    actual_price: 0,
    crossed_price: 0,
    manufacturer: '',
    country: '',
    category: '',
    sub_category: ''
  })

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const onSave = (e) => {
    e.preventDefault();
    let newProduct = { ...product, id: Number(product.id), actual_price: Number(product.actual_price), crossed_price: Number(product.crossed_price), country: '',images}
    createProduct(newProduct)
      .then((res) => { console.log(res) })
      .catch((error) => console.log(error))
  }

  const handleOnChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreview([])
    setImages([])
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(oldArray => [...oldArray, reader.result])
          setImages(oldArray => [...oldArray, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="left">
            <div id="product_image">
              <Carousel pause='hover'>
                {
                  imagePreview.map((url) => {
                    return (
                      <Carousel.Item>
                        <img className='d-block w-100' src={url} />
                        {/* <img className='d-block w-100' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSnfBD8oiQixFsc59ccAI4fSbIBvvTjUEZuw&usqp=CAU"} /> */}
                      </Carousel.Item>
                    )
                  })
                }
              </Carousel>
            </div>
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={handleOnChange}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input name={input.name} type={input.type} placeholder={input.placeholder} onChange={handleProductChange} />
                </div>
              ))}
              <button onClick={onSave}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Addproducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState("");
  const [description, setDescription] = useState('');
  const [listingType, setListingType] = useState("others");
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`https://673c4f2196b8dcd5f3f961c0.mockapi.io/Products/Products`, {
      name,
      price,
      image,
      listingType,
      description,
    });
    sessionStorage.setItem('name', name)
    sessionStorage.setItem('price', price)
    sessionStorage.setItem('image', image)
    sessionStorage.setItem('listingType', listingType)
    setName("");
    setPrice("");
    setImage("");
    setImageData("");
    setListingType("others");
  };
  navigate('/products')

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setImage(file.name);
    }
  };


  return (
    <div>

      <div className="w-50 container m-auto vh-100 d-flex flex-column justify-content-center">
        <div>
          <h2 className="mt-3 mb-4 bg-light text-center w-50">Add New Products</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          {imageData && (
            <img
              src={imageData}
              alt="Selected"
              className="img-fluid mb-3"
              style={{ maxWidth: "200px" }}
            />
          )}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Categories
            </label>
            <select
              className="form-control"
              id="category"
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              required
            >
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
              <option value="tshirts">Tshirts</option>
              <option value="shorts">Shorts</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success fs-5">
              Add Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Addproducts
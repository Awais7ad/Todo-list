import React, { useState, useEffect } from "react";
import "./form.css";

const Form = () => {
  // Memory spaces to remember what you type
  const [name, setName] = useState("");
  const [pnumber, setPnumber] = useState("");
  const [qnumber, setQnumber] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddProduct = () => {
    if (name.trim() === "" || pnumber.trim() === "" || qnumber.trim() === "" || image.trim() === "") {
      alert("All fields must be filled.");
      return;
    }

    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = { name, price: pnumber, quantity: qnumber, image };
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([...products, { name, price: pnumber, quantity: qnumber, image }]);
    }

    setName("");
    setPnumber("");
    setQnumber("");
    setImage("");
  };

  const handleEditProduct = (index) => {
    setEditIndex(index);
    setName(products[index].name);
    setPnumber(products[index].price);
    setQnumber(products[index].quantity);
    setImage(products[index].image);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleImageUpload = (e) => {
    // Get the selected file from the input
    const file = e.target.files[0];
    
    if (file) {
      // Convert the file to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleAddProduct();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [name, pnumber, qnumber, image]);

  return (
    <>
      <div className="wrapper">
        <div className="form">
          <input
            type="text"
            placeholder="Product-Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="number"
            min="1"
            value={pnumber}
            onChange={(e) => setPnumber(e.target.value)}
          />
          <br />
          <input
            type="number"
            min="1"
            value={qnumber}
            onChange={(e) => setQnumber(e.target.value)}
          />
          <br />
          {/* File input for image upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <br />
          <button onClick={() => handleAddProduct()}>
            {editIndex !== null ? "Edit Product" : "Add Product"}
          </button>
        </div>
      </div>
      <div className="cards">
        {products.map((product, index) => (
          <div className="card" key={index}>
            {/* Displaying product image */}
            <img
              src={product.image}
              alt="product"
              style={{ width: "300px", height: "50%" }}
            />
            <div class="forP">
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
            <div className="card-actions">
              <div>
                <button onClick={() => handleEditProduct(index)}>Edit</button>
              </div>
              <div>
                <button onClick={() => handleDeleteProduct(index)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Form;

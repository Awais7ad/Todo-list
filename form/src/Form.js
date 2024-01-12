import React, { useState,useEffect } from 'react';
import './form.css';

const Form = () => {
  const [name, setName] = useState('');
  const [pnumber, setPnumber] = useState('');
  const [qnumber, setQnumber] = useState('');
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddProduct = () => {
    console.log("name",name.trim()+"pnumber",pnumber+"qnumber",qnumber)
    if (name.trim() === '' || pnumber.trim() === '' || qnumber.trim() === '') {
      alert('All fields must be filled.');
      return;
    }

    if (editIndex !== null) {
      // Editing an existing product
      const updatedProducts = [...products];
      updatedProducts[editIndex] = { name, price: pnumber, quantity: qnumber };
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      // Adding a new product
      setProducts([...products, { name, price: pnumber, quantity: qnumber }]);
    }

    setName('');
    setPnumber('');
    setQnumber('');
  };

  const handleEditProduct = (index) => {
    setEditIndex(index);
    setName(products[index].name);
    setPnumber(products[index].price);
    setQnumber(products[index].quantity);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };
  useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === 'Enter') {
        handleAddProduct()

							}
		}

		document.addEventListener('keydown', handleKeyPress)

		return () => {
			document.removeEventListener('keydown', handleKeyPress)
		}
	},[name,pnumber,qnumber])

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
        <button onClick={() => handleAddProduct()}>
          {editIndex !== null ? 'Edit Product' : 'Add Product'}
        </button>
      </div>
    </div>
      <div className="cards">
        
        {products.map((product, index) => (
          <div className="card" key={index}>
            <img src="./card.jpg" alt="error" style={{width:"300px",height:"50%"}}/>
            
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
              <button onClick={() => handleDeleteProduct(index)}>Delete</button>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </>  
    
  );
};

export default Form;






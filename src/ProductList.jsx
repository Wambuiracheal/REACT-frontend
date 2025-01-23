import React, { useState } from 'react'
import ProductItem from './ProductItem'

function ProductList({products,setProducts}){
    const base_url = 'http://127.0.0.1:5000/products'
    const [productData,setProductData] = useState({
        name:"",
        price:"",
        category:""
    })

    function handleChange(e){
        const name = e.target.name
        const value = e.target.value
        setProductData ({
            ...productData,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`${base_url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(product => {
            setProducts([...products,product])
            setProductData({
                name:"",
                price:0,
                category:""
            })
        })
    }
  return(
    <>
      {products.map(product =>(
        <ProductItem key={product.id}
            name = {product.name}
            price = {product.price}
            category = {product.category}
            id={product.id}
            products = {products}
            setProducts= {setProducts}
        />
      ))}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={productData.name} required onChange={handleChange}/>
        <input type="number" name="price" placeholder="Price" value={productData.price} required onChange={handleChange}/>
        <input type="text" name="category" placeholder="Category" value={productData.category} required onChange={handleChange}/>
        <button type="submit">Add Product</button>
      </form>
    </>
  )
}

export default ProductList

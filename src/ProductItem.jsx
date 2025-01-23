import React, { useState } from 'react';
import './App.css'

function ProductItem({name,price,category,id,products,setProducts}){
    const [newName,setName] = useState('')
    const base_url = 'http://127.0.0.1:5000/products'

    function handleDelete(){
        fetch(`${base_url}/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(() => {
            let remainingProducts = products.filter(products => products.id !== id)
            setProducts(remainingProducts)
          })
          .catch(err => console.log(err))
    }

    function handleChange(e){
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        fetch(`${base_url}/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newName})
        })
        .then(res => res.json())
        .then(updatedProducts => {
            let updatedProduct = products.map(product => {
                if(product.id === id){
                    product.name = updatedProduct.name
                }
                return product
            })
            setProducts(updatedProducts)
            setName("")
        })
    }

return (
    <>
        <div className='product-item'>
            <h1>{name}</h1>
            <h2>{price}</h2>
            <h3>{category}</h3>
            <form onSubmit={handleSubmit}>
                <input name='newName' placeholder='New Name' value={newName} onChange={handleChange} required/>
                <br></br>
                <button type='submit'>Update Product</button>
            </form>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </>
  )
}

export default ProductItem

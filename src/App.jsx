import { useEffect, useState } from 'react'
import './App.css'
import ProductList from './ProductList'

function App() {
  const base_url = 'http://127.0.0.1:5000/products'
  const [products, setProducts] = useState([])
  useEffect(()=>{
    fetch(`${base_url}`)
    .then(response => response.json())
    .then(data => setProducts(data))
  },[])

  return (
    <>
        <h1>Welcome back to react</h1>
        <ProductList  products= {products} setProducts= {setProducts} />
    </>
  )
}

export default App

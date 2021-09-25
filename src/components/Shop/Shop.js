import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import {addToDb, getStoredCart} from '../../utilities/fakedb'
import './Shop.css'
const Shop = () => {
    const [products, setProducts]=useState([]);
    const [cart, setCart] = useState([]);

    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
        
        fetch('./products.JSON')
        .then(res => res.json())
        .then (data => {
            setProducts(data);
            setDisplayProducts(data);
        })
    }, []);

    useEffect( () => {
        
        
        if(products.length){
         const saveCart = getStoredCart();
         const storedCart = [];
        // console.log(saveCart);
           for(const key in saveCart){
            // console.log(key, saveCart[key])
            // console.log(key);
            const addedProduct = products.find(product => product.key === key);
            // console.log(key, addedProduct);
            if(addedProduct){

                const quantity = saveCart[key];
                addedProduct.quantity = quantity;
                // console.log(addedProduct);
                storedCart.push(addedProduct);
            } 
            
           } 
           setCart(storedCart);
        }
    }, [products])
    const handleAddToCart = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
        //save to local storage for now
        addToDb(product.key)
    }
    const handleSearch = event => {  
    const searchText = event.target.value;

    const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

    setDisplayProducts(matchedProducts);
    // console.log(matchedProducts.length);
    }
    return (
    <>
        <div className="search-container">
            <input 
            onChange={handleSearch} 
            type="text" placeholder="Search Product" />
        </div>
        
        <div className="shop-container">
            <div className="product-container">
             {
                displayProducts.map(product => 
                <Product
                key={product.key} 
                product={product}
                handleAddToCart={handleAddToCart}>
                
                </Product>) 
             }
            </div>
            <div className="cart-container">
              <Cart cart={cart}></Cart>
            </div>
            
        </div>
    </>
    );
};

export default Shop;
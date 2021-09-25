import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import './Product.css'
import Rating from 'react-rating';
const Product = (props) => {
    // console.log(props);
    const {img, name, price, stock, seller, star} = props.product;
    const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />

    return (
        <div className="product">

            <div className="product-img">
            <img src={img} alt="" />
            </div>

            <div className="product-details">

            <h3 className="product-name">{name}</h3>
            <p>By: {seller}</p>
            <h3 className="price">Price: {price}$</h3>
            <p>only {stock} left in stock - order soon</p>
            <Rating style={{marginBottom: '10px'}}
            initialRating={star} 
            emptySymbol="far fa-star icon-color"
            fullSymbol="fas fa-star icon-color"
            readonly></Rating>
             <br />
            <button
            onClick={ () => props.handleAddToCart(props.product)}
             className="cart-btn">{cartIcon} add to cart</button>
            </div>
        </div>
    );
};

export default Product;
import React from 'react';
import './productsList.scss';

export const ProductsList = ({ addProduct, productsList }) => {
  return (
    <ul className="products">
         {
          productsList.map(product => (
            <li key={product.id} className="products__item">
              <h2 className="products__name">{product.name}</h2>
              <p className="products__description">{product.label}</p>
              <p className="products__price">{product.price}.00 $</p>
              <button className="products__button" type="button" onClick={() => {addProduct(product.id)}}>Add</button>
            </li>
          ))
        }
      </ul>
  )
};
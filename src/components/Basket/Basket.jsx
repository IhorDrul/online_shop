import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Basket = (
  {
    storageProd,
    remove,
    removeAll,
    clearBasket,
  }
) => {
  const [basketList, setBasketList] = useState([]);

  const totalPrice = storageProd.reduce((acc, curr) => (acc + curr.price), 0);

  const basketListCreator = (array) => {
    const basketObj = array.reduce((acc, curValue) => {
      return acc[curValue.name]
        ? {...acc, [curValue.name]: acc[curValue.name] + 1}
        : { ...acc, [curValue.name]: 1};
    }, {});

    setBasketList(Object.entries(basketObj));
  }

  useEffect(() => {
    basketListCreator(storageProd);
  }, [storageProd]);

  return (
    <>
      {
        basketList.length === 0
          ? <h2>Your basket is empty</h2>
          : (
            <>
              <ul>
                {
                  basketList.map(basketItem => (
                    <li key={Math.random()}>
                      <h2>{basketItem[0]}: <span>{basketItem[1]}</span></h2>
                      <button type="button" onClick={() => {remove(basketItem[0])}}>Remove</button>
                      <button type="button" onClick={() => {removeAll(basketItem[0])}}>Remove All</button>
                    </li>
                  ))
                }
              </ul>
              <button type="button" onClick={clearBasket} >Clear basket</button>
            </>
          )
      }
      {totalPrice > 0 && <h2>Total price: {totalPrice}.00$</h2>}
    </>
  )
};

Basket.propTypes = {
  storageProd: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  remove: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired,
  clearBasket: PropTypes.func.isRequired,
};

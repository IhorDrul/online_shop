import React, { useState, useEffect } from 'react';

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
    console.log(basketObj);
    setBasketList(Object.entries(basketObj));
  }

  useEffect(() => {
    basketListCreator(storageProd);
  }, [storageProd]);

  return (
    <>
      {/* {
        storageProd.length === 0
          ? <h2>Your basket is empty</h2>
          : (
              <>
                <ul>
                  {
                    storageProd.map(product => (
                      <li key={Math.random()}>
                        {product.name}
                        <button type="button" onClick={() => {remove(product.id)}}>Remove</button>
                        <button type="button" onClick={() => {removeAll(product.id)}}>Remove All</button>
                      </li>
                    ))
                  }
                </ul>
                <button type="button" onClick={clearBasket} >Clear basket</button>
              </>
          )
      } */}
      {
        basketList.length === 0
          ? <h2>Your basket is empty</h2>
          : (
            <>
              <ul>
                {
                  basketList.map(basketItem => (
                    <li key={basketItem[0]}>
                      <h2>{basketItem[0]}: <span>{basketItem[1]}</span></h2>
                      <button type="button" onClick={() => {remove(+basketItem[0].slice(basketItem[0].length - 1))}}>Remove</button>
                      <button type="button" onClick={() => {removeAll(+basketItem[0].slice(basketItem[0].length - 1))}}>Remove All</button>
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
}
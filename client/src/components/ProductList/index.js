import React, { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS, UPDATE_TICKERS } from "../../utils/actions";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory, categories, tickers } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (categories.length > 0 && currentCategory) {
      let sector = categories.filter((cat) => cat._id === currentCategory)[0]
        .name;
      console.log("sectore", sector);
      let url = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=${sector}&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=a2c95afec94c5622aff72fc3c2a5c813`;
      console.log("url", url);
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((tickers) => {
          console.log(tickers);
          dispatch({
            type: UPDATE_TICKERS,
            tickers: tickers,
          });
        });
    }

    /*if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }*/
  }, [currentCategory, dispatch]); //[data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    console.log("tickers", state.tickers);

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Related Stock Symbols:</h2>
      {tickers.length ? (
        <div className="flex-row">
          {tickers.map((ticker) => (
            <ProductItem
              key={ticker.symbol}
              _id={ticker.symbol}
              symbol={ticker.symbol}
              // image={product.image}
              name={ticker.companyName}
              price={ticker.price}
              // quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;

import "./styles.css";
import { data } from "./db";
import { getMinMaxPrice } from "./minMaxProductPrice";
import { useFilter } from "./filter-context";

const filterBySort = (product, sortTo) => {
  switch (sortTo) {
    case "HIGH-TO-LOW":
      return product.sort((a, b) => b.price - a.price);

    case "LOW-TO-HIGH":
      return product.sort((a, b) => a.price - b.price);
    default:
      return product;
  }
};

const filterByStock = (product, filterFlag) => {
  return filterFlag ? product.filter(({ inStock }) => inStock) : product;
};

const filterByFastDelivery = (product, fastDeliveryFlag) => {
  return fastDeliveryFlag
    ? product.filter(({ fastDelivery }) => fastDelivery)
    : product;
};

const filterByPriceRange = (product, priceRange) => {
  return product.filter(({ price }) => price <= Number(priceRange));
};

export default function App() {
  const { maxPrice, minPrice } = getMinMaxPrice(data);
  const { state, dispatch } = useFilter();
  const { sortBy, inStockChecked, fastDeliveryChecked, priceSlider } = state;

  const filteredBySort = filterBySort(data, sortBy);
  const filteredByStock = filterByStock(filteredBySort, inStockChecked);
  const filteredByFastDelivery = filterByFastDelivery(
    filteredByStock,
    fastDeliveryChecked
  );
  const filteredProducts = filterByPriceRange(
    filteredByFastDelivery,
    priceSlider
  );

  return (
    <>
      <h2>Filter</h2>
      <input
        onChange={() => dispatch({ type: "SORT", payload: "HIGH-TO-LOW" })}
        type="radio"
        name="sort-price"
        id="high-to-low"
        value="high-to-low"
        checked={sortBy === "HIGH-TO-LOW"}
      />
      <label htmlFor="high-to-low">High to low</label>{" "}
      <input
        onChange={() => dispatch({ type: "SORT", payload: "LOW-TO-HIGH" })}
        type="radio"
        name="sort-price"
        id="low-to-high"
        value="low-to-high"
        checked={sortBy === "LOW-TO-HIGH"}
      />
      <label htmlFor="low-to-high">Low to high</label>{" "}
      <input
        onChange={() => dispatch({ type: "IN-STOCK" })}
        type="checkbox"
        name="in-stock"
        id="in-stock"
        checked={inStockChecked}
      />
      <label htmlFor="in-stock">In stock</label>{" "}
      <input
        onChange={() => dispatch({ type: "FAST-DELIVERY" })}
        type="checkbox"
        name="fast-delivery"
        id="fast-delivery"
        checked={fastDeliveryChecked}
      />
      <label htmlFor="fast-delivery">Fast Delivery</label>{" "}
      <input
        type="range"
        min={minPrice}
        onInput={(e) =>
          dispatch({ type: "PRICE-SLIDER", payload: e.target.value })
        }
        max={maxPrice}
        id="price-range"
        value={priceSlider}
      />
      <button onClick={() => dispatch({ type: "CLEAR-FILTER" })}>Clear</button>
      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <div
              key={id}
              style={{
                border: "1px solid #4B5563",
                borderRadius: "0 0 0.5rem 0.5rem",
                margin: "1rem",
                maxWidth: "40%",
                padding: "0 0 1rem"
              }}
            >
              <img src={image} width="100%" height="auto" alt={productName} />
              <h3> {name} </h3>
              <div>Rs. {price}</div>
              {inStock && <div> In Stock </div>}
              {!inStock && <div> Out of Stock </div>}
              <div>{level}</div>
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}

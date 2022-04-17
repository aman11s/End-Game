import { defaultFilterValue } from "./defaultFilterValue";

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };

    case "IN-STOCK":
      return { ...state, inStockChecked: !state.inStockChecked };

    case "FAST-DELIVERY":
      return { ...state, fastDeliveryChecked: !state.fastDeliveryChecked };

    case "PRICE-SLIDER":
      return { ...state, priceSlider: action.payload };

    case "CLEAR-FILTER":
      return defaultFilterValue;

    default:
      return state;
  }
};

export { filterReducer };

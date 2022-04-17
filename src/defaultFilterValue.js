import { data } from "./db";
import { getMinMaxPrice } from "./minMaxProductPrice";

const { maxPrice } = getMinMaxPrice(data);

const defaultFilterValue = {
  inStockChecked: false,
  fastDeliveryChecked: false,
  sortBy: null,
  priceSlider: maxPrice
};

export { defaultFilterValue };

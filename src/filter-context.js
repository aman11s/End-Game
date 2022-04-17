import { defaultFilterValue } from "./defaultFilterValue";
import { filterReducer } from "./filterReducer";
const { createContext, useReducer, useContext } = require("react");

const FilterContext = createContext(null);

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, defaultFilterValue);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
